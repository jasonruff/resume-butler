// Mock for pdfjs-dist
export const getDocument = () => ({
  promise: Promise.resolve({
    numPages: 1,
    getPage: () => Promise.resolve({
      getTextContent: () => Promise.resolve({
        items: [{ str: 'Sample PDF content' }]
      })
    })
  })
});

export default {
  getDocument
};