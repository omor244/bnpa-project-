


export const handleImageChange = (e, type, setPreview) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(prev => ({ ...prev, [type]: reader.result }));

        };
        reader.readAsDataURL(file);
        
    }
};







