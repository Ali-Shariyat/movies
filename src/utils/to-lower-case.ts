export function convertKeysToLowerCase(obj) {
    const convertedObject = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const lowerKey = key.toLowerCase();
            convertedObject[lowerKey] = obj[key];
        }
    }
    return convertedObject;
}