import { Country } from "../country.type";
import { Language } from "../language.type";

export type HTTPHeaderValueContentLanguage = { language: Language, country?: Country }[];
