"use client";

export type Dictionary = {
  word:string,
  phonetics:Array<{ audio: string }>
}

export type Response<T> = {
  data:T,
  status:number
}

const API_URL = "https://api.dictionaryapi.dev";

export const searchService = async (searchText: string, lang = "en"): Promise<Response<Array<Dictionary>>> => {
  return fetch(API_URL + `/api/v2/entries/${lang}/${searchText}`)
    .then(async (response) => {
      return { data: response.ok ? await response.json() : null, status: response.status };
    })
};
