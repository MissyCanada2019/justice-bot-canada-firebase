export const Evidence = {
  list: async (caseId: number) => {
    console.log(`Fetching evidence for case ${caseId}`);
    return {
      docs: [
        { id: 1, filename: "evidence1.pdf", type: "application/pdf" },
        { id: 2, filename: "photo.jpg", type: "image/jpeg" },
      ],
    };
  },
  presign: async (caseId: number, filename: string, contentType: string) => {
    console.log(`Getting presigned URL for ${filename} in case ${caseId}`);
    return {
      upload_url: `https://storage.googleapis.com/your-bucket/evidence/${caseId}/${filename}`,
      headers: { "Content-Type": contentType },
    };
  },
};

export const FormsApi = {
  recommend: async (issue?: string) => {
    console.log(`Getting form recommendation for issue: ${issue}`);
    return {
      recommended: "Form T2",
      prefill: { tenant_name: "John Doe", landlord_name: "Jane Smith" },
    };
  },
};
