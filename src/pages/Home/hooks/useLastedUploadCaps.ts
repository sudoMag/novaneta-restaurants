import { useState } from "react";

export default function useLastedUploadServiceCaps () {
  const [lastedCaps, setlastedCaps] = useState<[]>([]);
  const MANGADEX_API = "https://api.mangadex.org";

  const getLastedCaps = async () => {
    await fetch(`${MANGADEX_API}/manga#availableTranslatedLanguage=es`).then(res => {
      return console.log(res.json());
    }).catch(err => {
      console.error(err);
    });
  }

  return {lastedCaps, getLastedCaps};
}
