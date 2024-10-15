import React, { useState } from 'react';

const DropDownProducts = () => {
  const [activeTab, setActiveTab] = useState('Company Info'); // State to track active tab
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    website: '',
    products: [{ productName: '', version: '', availabilityDate: '' }], // Store products in an array
    hardwareSystem: '',
    operatingSystem: ''
  });
  const [productTabs, setProductTabs] = useState(['Product 1']); // Store dynamically added product tabs
  const [addMoreProducts, setAddMoreProducts] = useState(false); // Checkbox state for adding products

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Switch to selected tab
  };

  const handleChange = (e, index = null) => {
    // Handle form data change
    if (index !== null) {
      const newProducts = [...formData.products];
      newProducts[index][e.target.name] = e.target.value;
      setFormData({ ...formData, products: newProducts });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleAddProductCheckbox = (e) => {
    setAddMoreProducts(e.target.checked); // Checkbox toggled for adding another product
  };

  const handleNextClick = () => {
    if (addMoreProducts) {
      // If checkbox is checked, add a new product tab
      const nextProductIndex = productTabs.length + 1;
      setProductTabs([...productTabs, `Product ${nextProductIndex}`]); // Dynamically add product tabs
      setFormData({
        ...formData,
        products: [...formData.products, { productName: '', version: '', availabilityDate: '' }]
      });
      setAddMoreProducts(false); // Reset checkbox state
      setActiveTab(`Product ${nextProductIndex}`); // Switch to the new product tab
    } else {
      setActiveTab('Hardware System'); // Move to the hardware system tab
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
    setProductTabs(productTabs.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formData); // Log form data on submit
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Multi-Tab Application Form</h1>

      {/* Tab navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'Company Info' ? 'active' : ''}`} onClick={() => handleTabClick('Company Info')}>
            Company Info
          </button>
        </li>

        {/* Conditional Rendering: If more than one product, show dropdown, otherwise normal tab */}
        {productTabs.length > 1 ? (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="productDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Products
            </a>
            <ul className="dropdown-menu" aria-labelledby="productDropdown">
              {productTabs.map((tab, index) => (
                <li key={index}>
                  <button className="dropdown-item" onClick={() => handleTabClick(tab)}>
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'Product 1' ? 'active' : ''}`} onClick={() => handleTabClick('Product 1')}>
              Product 1
            </button>
          </li>
        )}

        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'Hardware System' ? 'active' : ''}`} onClick={() => handleTabClick('Hardware System')}>
            Hardware System
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'Review and Submit' ? 'active' : ''}`} onClick={() => handleTabClick('Review and Submit')}>
            Review and Submit
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div className="tab-content mt-4">
        {activeTab === 'Company Info' && (
          <div className="tab-pane fade show active">
            <h2>Company Info</h2>
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </div>
        )}

        {productTabs.map((tab, index) => (
          <div key={index} className={`tab-pane fade show ${activeTab === tab ? 'active' : ''}`}>
            <h2>{tab}</h2>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                name="productName"
                value={formData.products[index].productName}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group">
              <label>Version</label>
              <input
                type="text"
                className="form-control"
                name="version"
                value={formData.products[index].version}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group">
              <label>Availability Date</label>
              <input
                type="date"
                className="form-control"
                name="availabilityDate"
                value={formData.products[index].availabilityDate}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="addMoreProducts" onChange={handleAddProductCheckbox} />
              <label className="form-check-label" htmlFor="addMoreProducts">
                Add Another Product
              </label>
            </div>
            <ul className="nav nav-tabs d-flex">
            <button className="btn btn-danger" onClick={() => handleRemoveProduct(index)}>
              Remove Product
            </button>
            <button className="btn btn-primary m-3" onClick={handleNextClick}>
              Next
            </button>
            </ul>
          
          </div>
        ))}

        {activeTab === 'Hardware System' && (
          <div className="tab-pane fade show active">
            <h2>Hardware System</h2>
            <div className="form-group">
              <label>Hardware System</label>
              <input type="text" className="form-control" name="hardwareSystem" value={formData.hardwareSystem} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Operating System</label>
              <input type="text" className="form-control" name="operatingSystem" value={formData.operatingSystem} onChange={handleChange} />
            </div>
          </div>
        )}

        {activeTab === 'Review and Submit' && (
          <div className="tab-pane fade show active">
            <h2>Review and Submit</h2>
            <p><strong>Company Name:</strong> {formData.companyName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Website:</strong> {formData.website}</p>
            {formData.products.map((product, index) => (
              <div key={index}>
                <p><strong>Product {index + 1} Name:</strong> {product.productName}</p>
                <p><strong>Version:</strong> {product.version}</p>
                <p><strong>Availability Date:</strong> {product.availabilityDate}</p>
              </div>
            ))}
            <p><strong>Hardware System:</strong> {formData.hardwareSystem}</p>
            <p><strong>Operating System:</strong> {formData.operatingSystem}</p>
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownProducts;
