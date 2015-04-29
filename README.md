# jgen
Give it JSON schema/s and it will give you back valid JSON


## Assumptions

Some assumptions to get this where it needs to be, to be used in our json schema suite: 

+ It should generate fields based off type.
+ It should consider keywords the schema defines per field, ie; validation keywords and hyperlinking keywords.
+ It should take a singular schema of many schemas, or multiple schemas as an array, and produce an object with all hyperlinking resolved before generation.
+ It should generate instances of schemas by their ID
