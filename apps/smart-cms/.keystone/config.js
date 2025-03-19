"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// src/keystone/schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    // WARNING
    //   for this example, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      about: (0, import_fields_document.document)({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1]
        ]
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  })
};

// src/keystone/seed.ts
async function seedDemoData(context) {
  if (await context.db.User.count() > 0) return;
  for (const user of [
    {
      name: "Clark"
    },
    {
      name: "Bruce"
    },
    {
      name: "Diana"
    }
  ]) {
    await context.db.User.createOne({ data: user });
  }
}

// keystone.ts
var keystone_default = (0, import_core2.config)({
  db: {
    provider: "sqlite",
    url: `file:${process.cwd()}/keystone.db`,
    // next.js requires an absolute path for sqlite
    onConnect: async (context) => {
      await seedDemoData(context);
    }
  },
  lists
});
//# sourceMappingURL=config.js.map
