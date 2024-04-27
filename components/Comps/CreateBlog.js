import React, { useState } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { Box, Button } from '@mui/material';

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',     
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};

ckfinder: {
    uploadUrl: '/your-image-upload-endpoint' // Replace this with your server's image upload endpoint
}

function CustomEditor({ initialData }) {
    const [editorData, setEditorData] = useState(initialData);

    const handleDataChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div>
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={initialData}
                onChange={handleDataChange}
            />
            <Box mt={2}>
                <Button variant="contained"  onClick={() =>console.log(editorData)}>
                    Test
                </Button>
            </Box>
        </div>
    );
}

export default CustomEditor;