import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BasicButton, BrownButton, DarkRedButton, IndigoButton } from '../../../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { deleteStuff, getProductsbyAdmin } from '../../../redux/userHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate.jsx';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from '@mui/icons-material/Upload';

const ShowProducts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser, currentRole, loading, adminProductData, responseAdminProducts } = useSelector(state => state.user);

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getProductsbyAdmin(currentUser._id));
  }, [dispatch, currentUser._id])

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteStuff(deleteID, address))
      .then(() => {
        dispatch(getProductsbyAdmin(currentUser._id));
      })
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Product',
      action: () => navigate("/Admin/addproduct")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Products',
      action: () => deleteHandler(adminID, "DeleteProducts")
    },
  ];

  const shopcartActions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Product',
      action: () => navigate("/Admin/addproduct")
    },
    {
      icon: <UploadIcon color="success" />, name: 'Upload New Product',
      action: () => navigate("/Admin/uploadproducts")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Products',
      action: () => deleteHandler(adminID, "DeleteProducts")
    },
  ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {
            responseAdminProducts ?
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <IndigoButton onClick={() => navigate("/Admin/addproduct")}>
                  Add Product
                </IndigoButton>
                <br /><br />
                {
                  currentRole === "Shopcart" &&
                  <BrownButton onClick={() => navigate("/Admin/uploadproducts")}>
                    Upload Product
                  </BrownButton>
                }
              </Box>
              :
              <>
                {Array.isArray(adminProductData) && adminProductData.length > 0 &&
                  <ProductGrid container spacing={3}>
                    {adminProductData.map((data, index) => (
                      <Grid item xs={12} sm={6} md={4}
                        key={index}
                      >
                        <ProductContainer>
                          <ProductImage src={data.productImage} />
                          <ProductName>{data.productName}</ProductName>
                          <PriceMrp>{data.price.mrp}</PriceMrp>
                          <PriceCost>₹{data.price.cost}</PriceCost>
                          <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
                          <ButtonContainer>
                            <DarkRedButton
                              onClick={() => deleteHandler(data._id, "DeleteProduct")}
                            >
                              Delete
                            </DarkRedButton>
                            <BasicButton
                              onClick={() => navigate("/Admin/products/product/" + data._id)}
                            >
                              View
                            </BasicButton>
                          </ButtonContainer>
                        </ProductContainer>
                      </Grid>
                    ))}
                  </ProductGrid>
                }
                {
                  currentRole === "Shopcart"
                    ?
                    <SpeedDialTemplate actions={shopcartActions} />
                    :
                    <SpeedDialTemplate actions={actions} />
                }
              </>
          }
        </>
      }
    </>
  )
};

export default ShowProducts;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
`;

const PriceMrp = styled.p`
  margin-top: 8px;
  text-align: center;
  text-decoration: line-through;
  color: #525050;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
`;

const PriceDiscount = styled.p`
  margin-top: 8px;
  text-align: center;
  color: darkgreen;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
`;