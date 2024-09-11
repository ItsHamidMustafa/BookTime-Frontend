import { useLocation } from 'react-router-dom';

export const PDFViewer = () => {
    const location = useLocation();
    const { pdfUrl } = location.state || {};

    return (
        <div className='pdf-viewer'>
            {pdfUrl ? (
                <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer"></iframe>
            ) : (
                <p>No PDF available</p>
            )}
        </div>
    );
};