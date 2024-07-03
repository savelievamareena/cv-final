import { gql, useMutation } from "@apollo/client";
import { ExportPdfInput } from "cv-graphql";
import { downloadBase64 } from "@/helpers/download-base64";
import { useNotificationContext } from "@/helpers/notification";

export const EXPORT_PDF = gql`
    mutation ExportPdf($pdf: ExportPdfInput!) {
        exportPdf(pdf: $pdf)
    }
`;

export interface ExportPdfResult {
    exportPdf: string;
}

export const usePdfExport = (cvName: string | undefined) => {
    const { showNotification } = useNotificationContext();

    return useMutation<ExportPdfResult, { pdf: ExportPdfInput }>(EXPORT_PDF, {
        onCompleted: (data) => {
            data &&
                downloadBase64({
                    name: cvName ?? "CV",
                    base64: data.exportPdf,
                    contentType: "application/pdf",
                });
        },
        onError: (error) => {
            showNotification("error", error.message);
        },
    });
};
