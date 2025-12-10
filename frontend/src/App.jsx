import { useEffect, useRef, useState } from "react";
import "./index.css";
import { fetchImages, postNewImage } from "./services/api";

function App() {
	const [images, setImages] = useState([]);
	const [newImage, setNewImage] = useState("");
	const fileInputRef = useRef(null);

	useEffect(() => {
		const loadImages = async () => {
			const images = await fetchImages();
			setImages(images);
		};

		loadImages();
	}, []);

	const handleFileChange = (e) => {
		setNewImage(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (!newImage) return alert("Selecione uma imagem!");

		const newImageData = await postNewImage(newImage);
		setImages((prev) => [...prev, newImageData]);

		fileInputRef.current.value = "";
		setNewImage(null);
	};

	const handleDeleteImage = async (imageId) => {
		try {
			const response = await fetch(`http://localhost:3000/images/${imageId}`, {
				method: "DELETE",
			});
			const data = await response.json();

			alert(data.message);

			setImages((prev) => prev.filter((image) => image.id !== imageId));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">
			<h1 className="main-title">Upload de imagens</h1>

			<div className="main-container">
				<div className="file_field-container">
					<label className="file_field-label">Adicionar imagem</label>
					<input
						type="file"
						ref={fileInputRef}
						accept="image/*"
						className="file_field-input"
						onChange={handleFileChange}
					/>
					<button className="file_field-button" onClick={handleUpload}>
						Enviar
					</button>
				</div>

				<div className="files-container">
					{images.length === 0 ? (
						<p>Sem imagens</p>
					) : (
						images.map((image) => (
							<div key={image.id} className="file_image-container">
								<button className="file_image-delete" onClick={() => handleDeleteImage(image.id)}>
									X
								</button>
								<img src={`http://localhost:3000/${image.url}`} alt="imagem" className="file_image" />
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
