const avro = require("avsc");
const type = avro.Type.forSchema({
  type: "record",
  fields: [
    { name: "kind", type: { type: "enum", symbols: ["CAT", "DOG"] } },
    { name: "name", type: "string" },
  ],
});

const buf = type.toBuffer({ kind: "CAT", name: "Albert" }); // Encoded buffer.
const val = type.fromBuffer(buf); // = {kind: 'CAT', name: 'Albert'}

console.log(buf);
console.log("VAL : " + val);
