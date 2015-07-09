const NUMBER_REGEXP = /[-]?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/g;
export var sanitizeProperties = property => property.replace('3d', 'THREE_D');
export var unsanitizeProperties = property => property.replace('THREE_D', '3d');
export var placeholdNumbers = string => sanitizeProperties(string).replace(NUMBER_REGEXP, '$');
export var extractNumbers = string => string.match(NUMBER_REGEXP).map(parseFloat);
export var interpolateNumbers = (string, numbers) =>
    unsanitizeProperties(numbers.reduce((string, number) => string.replace('$', number), string));