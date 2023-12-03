import React, { useState } from 'react';

const UpdateEquipmentForm = ({ id, equipment }) => {
  const [name, setName] = useState(equipment.name);
  const [description, setDescription] = useState(equipment.description);
  const [image, setImage] = useState(equipment.image);
  const [categoryId, setCategoryId] = useState(equipment.category.id);
  const [brand, setBrand] = useState(equipment.brand);
  const [purchaseLink, setPurchaseLink] = useState(equipment.purchaseLink);
  const [priceRating, setPriceRating] = useState(equipment.priceRating);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('categoryId', categoryId);
    formData.append('brand', brand);
    formData.append('purchaseLink', purchaseLink);
    formData.append('priceRating', priceRating);

    const response = await fetch(`/api/equipment/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    if (response.ok) {
      // Equipment updated successfully
      const updatedEquipment = await response.json();
      console.log('Equipment updated successfully:', updatedEquipment);
    } else {
      // Error updating equipment
      console.error('Error updating equipment:', response.status);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} />

      <label>Image:</label>
      <input type="url" value={image} onChange={(event) => setImage(event.target.value)} />

      <label>Category:</label>
      <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
        {/* Display a list of categories as options */}
      </select>

      <label>Brand:</label>
      <input type="text" value={brand} onChange={(event) => setBrand(event.target.value)} />

      <label>Purchase Link:</label>
      <input type="url" value={purchaseLink} onChange={(event) => setPurchaseLink(event.target.value)} />

      <label>Price Rating:</label>
      <input type="number" min={1} max={5} value={priceRating} onChange={(event) => setPriceRating(event.target.value)} />

      <button type="submit">Update Equipment</button>
    </form>
  );
};

export default UpdateEquipmentForm;
