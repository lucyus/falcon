export class HeaderKeyValueParametersFormatter {

    public static format(
        rawParameters: string,
        shouldFormatParameterNameToCamelCase: boolean = false
    ): Record<string, string | undefined> {
        const matchedParameters = rawParameters
            .match(/(_*[a-zA-Z1-9]+((-|_){0,1}[a-zA-Z1-9]+)*)=(("([^"]*)")|([^,\s \r\n]*))/g) ||
            []
        ;
        const parameters: Record<string, string | undefined> = {};
        for (const matchedParameter of matchedParameters) {
            const parameterSplitted = matchedParameter.split("=");
            const rawParameterName = parameterSplitted[0];
            const parameterName = shouldFormatParameterNameToCamelCase ?
                rawParameterName
                    .split(/-|_/)
                    .map((word, index) => {
                        if (index === 0) {
                            return word.toLowerCase();
                        }
                        return word[0].toUpperCase() + word.slice(1).toLowerCase();
                    })
                    .join("")
                :
                rawParameterName
            ;
            const rawParameterValue = parameterSplitted.slice(1).join("=");
            const parameterValue = rawParameterValue
                .replace(/^"(.*)"$/, "$1")
            ;
            parameters[parameterName] = parameterValue;
        }
        return parameters;
    }

}
