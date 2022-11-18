import { Country } from "../country.type";
import { Language } from "../language.type";

export type HTTPHeaderValueAcceptLanguage = {
    language: Language,
    country?: Country,
    qualityFactor: number
}[];
