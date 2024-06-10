export default function formatMongooseDoc(docObject: Record<string, any>) {
  const newObject: Record<string, unknown> = {};

  for (const key in docObject) {
    const value = docObject[key];
    if (key === "__v") continue;
    else if (key === "_id") newObject.id = value.toString();
    else newObject[key] = value;
  }

  return newObject;
}
