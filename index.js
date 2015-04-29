var jp = require('json-ptr');
var _ = require('lodash');



var jgen = function(schema) {
  // var expandedSchema = expandSchema(schema);
  

  // expand schema
  var expandedSchema = expandSchema(schema);
  
  // return generator function
  return function(id) {
    var schema = expandedSchema;
    if (id) {
      schema = findSchema(id, expandedSchema);
    }
    // generate properties as an object
    return generateInstance(schema)
  }
}

module.exports = jgen;

function expandSchema(schema, rootSchema) {
  if (!rootSchema) rootSchema = schema;
  if (schema && schema.properties){
    _.each(schema.properties, function(prop, key) {
      if (prop['$ref']) {
        schema.properties[key] = expandSchema(resolveRef(prop['$ref'], rootSchema), rootSchema);
      }
    });
  }
  return schema
}

function resolveRef(ref, rootSchema) {
  var refValue = jp.create(ref).get(rootSchema);
  if (refValue['$ref']) {
    refValue = resolveRef(refValue['$ref'], rootSchema);
  }
  return refValue;
}

function findSchema(id, schema) {
  return _.find(schema.properties, function(value, key) {
    if (key == id) return true;
  })
}

function generateInstance(schema) {
  generateObject(schema.props)
}

function generateObject(props) {
  return _.reduce(props, function(obj, prop, key) {
    obj[key] = generateProp(prop);
    return obj;
  }, {})
}

function generateProp(prop) {
  if (is(prop, 'object')) {
    return generateObject(prop.properties);
  } else {
    return generateType(prop);
  }
}

function generateType(prop) {
  return 1
}

function is(prop, type) {
  return prop.type.indexOf(type) > -1 || prop.type == type;
}
