interface DownloadBase64Args {
    name: string;
    base64: string;
    contentType: string;
}

export const downloadBase64 = ({ name, base64, contentType }: DownloadBase64Args) => {
    const source = `data:${contentType};base64,${base64}`;
    const link = document.createElement("a");

    link.href = source;
    link.download = name;
    link.click();
};
