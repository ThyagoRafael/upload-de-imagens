const baseUrl = "http://localhost:3000";

export const fetchImages = async () => {
	try {
		const response = await fetch(`${baseUrl}/images`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		console.error(error);
		alert("Erro ao carregar imagens.");
	}
};

export const postNewImage = async (newImage) => {
	try {
		const formData = new FormData();
		formData.append("image", newImage);

		const response = await fetch(`${baseUrl}/upload`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		console.error(error);
		alert("Erro na postagem da imagem.");
	}
};

export const deleteImage = () => {};
