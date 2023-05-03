import { useContext, useState, FormEvent, ChangeEvent } from "react";
import { Context } from "../../../../context/ProductContext";
import Product from "../../../../utils/types/Product";

const useProductData = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    img_url: "",
  });
  const { addProduct, productImg, updateProduct, setImg, emptyImg } =
    useContext(Context);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editMode) {
      updateProduct({ ...data, img_url: productImg.url });
    } else {
      addProduct({ ...data, img_url: productImg.url });
    }
    setData({ id: "", name: "", description: "", price: 0, img_url: "" });
    emptyImg();
  };

  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.currentTarget.name === "price") {
      setData({
        ...data,
        [e.currentTarget.name]: Number(e.target.value.replace(/\D/g, "")),
      });
    } else {
      setData({
        ...data,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  const InputsViewToggle = () => {
    setShowInputs(!showInputs);
    setEditMode(false);
  };

  const editProduct = (product: Product) => {
    setEditMode(true);
    setShowInputs(true);
    setData({
      ...data,
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    });
    if (product.img_url) {
      setImg(product.img_url);
    } else {
      setImg("");
    }
  };

  return {
    showInputs,
    data,
    handleSubmit,
    onInputChangeHandler,
    InputsViewToggle,
    editProduct,
  };
};

export default useProductData;
