import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Function to upload a file to Firebase Storage and return the download URL
const upload = async (file) => {
    const storage = getStorage();   // Get Firebase storage instance
    const storageRef = ref(storage, `images/${Date.now() + file.name}`);    // Create a reference to the storage path with a unique file name

    // Initialize the upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Return a promise that resolves with the download URL once the upload is complete
    return new Promise((resolve, reject) => {
        // Monitor the state of the upload
        uploadTask.on('state_changed',
            (snapshot) => {
                // Calculate and log the upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle errors during the upload
                console.error(error);
                toast.error("Error uploading file: " + error.message); // Display error message using toast
                reject(error); // Reject the promise with the error
            },
            () => {
                // When the upload is complete, get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);   // Log the download URL
                    resolve(downloadURL)     // Resolve the promise with the download URL
                });
            }
        );
    })
}

export default upload