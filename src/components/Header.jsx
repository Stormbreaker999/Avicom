import React, { useEffect, useState } from 'react'
import Appbar from '@mui/material/AppBar'
import {Toolbar, Typography, IconButton, Badge, Box, Button, Autocomplete, TextField, Select, MenuItem, useTheme, Menu} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp'
import { getItemCount } from '../utils'
import {styled, alpha } from '@mui/material/styles'
import { fetchAllCategories } from '../features/categories-slice'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { useAuth } from '../firebase/Auth'
const StyleAutoComplete=styled(Autocomplete)(({theme})=>({
    color:"inherit",
    width:"100%",
    ml:"2",
    "& .MultiTextField-root":{
        paddingRight:`calc(1em+${theme.spacing(4)})`
    },
    "& .MuiInputBase-input":{
        color:theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline":{
        border:"none"
    },
    "& .MuiSvgIcon-root":{
    
        fill:theme.palette.common.white
    }
}))

const SearchIconWrapper=styled("section")(({theme})=>({
    padding:theme.spacing(0,2),
    height:"100%",
    position:"absolute",
    right:0,
    display:"flex",
    pointerEvents:"none",
    alignItems:"center",
    justifyContent:"center"

}))
const Search=styled("section")(({theme})=>({
    position:"relative",
    borderRadius:theme.shape.borderRadius,
    display:"flex",
    backgroundColor:alpha(theme.palette.common.white,0.15),
    "&.hover":{
        backgroundColor:alpha(theme.palette.common.white,0.25),
    
    },
    marginRight:theme.spacing(2),
    marginLeft:0,
    width:"100%"
}))

const StyledLink=styled(Link)(({theme})=>({
    color:theme.palette.common.white,
    textDecoration:"none"

}));



function SearchBar(){

    const theme=useTheme();
    const [searchParams]=useSearchParams();
    const category=searchParams.get("category");
    const products=useSelector(state=>state.products.value);
    const categories=useSelector(state=>state.categories.value);
    const searchTerm=searchParams.get("searchTerm");
    const [selectedCategory, setSelectedCategory]=useState("all");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        if(category)
        setSelectedCategory(category);
        else setSelectedCategory("all");
    }, [category])
    if(!categories?.length){
        dispatch(fetchAllCategories());
    }
    function handleCategoryChange(e){
        
        
        navigate(e.target.value==="all"?`/${searchTerm?"?searchTerm="+searchTerm:""}`:`/?category=${e.target.value}${searchTerm?"&searchTerm="+searchTerm:""}`)
    }
    function handleSearchChange(label){
        if(label){
            navigate(selectedCategory=="all"?`?searchTerm=${label}`:
            `/?category=${selectedCategory}&searchTerm=${label}`);
        }
        else{
            navigate(selectedCategory=="all"?`/`:
            `/?category=${selectedCategory}`);
        }
    }
    return <Search>
        <Select size="small" value={selectedCategory} onChange={handleCategoryChange} sx={{
            m:1,
            textTransform:"capitalize",
            "&":{
                "::before":{
                    "::hover":{
                        border:"none",
                    },
                    "::before, ::after":{
                        border:"none"
                    },
                    
                },
                ".MuiSelect-standard":{
                    color:"common.white",

                },
                ".MuiSelect-icon":{
                    fill:theme.palette.common.white
                }
            }
        }} variant="standard" labelId="selected-category" id="selected-category-id">
            <MenuItem value="all" sx={{textTransform:"capitalize"}}>All</MenuItem>
            {categories.map(cat=><MenuItem value={cat} key={cat} sx={{textTransform:"capitalize"}}>{cat}</MenuItem>)}
        </Select>
        <StyleAutoComplete
            freeSolo
            id="selected-product"
            onChange={(e,value)=>{
                console.log(e, value);
                handleSearchChange(value.label);
            }}
            disablePortal
            
            options={Array.from(selectedCategory==="all"?products:products.filter(prod=>prod.category===selectedCategory), prod=>({id:prod.id, label:prod.title}))}
            
            renderInput={(params)=><TextField {...params}/>}
        />
        <SearchIconWrapper>
            <SearchIcon/>
        </SearchIconWrapper>
    </Search>
}
function Header() {
    const {user, signOut}=useAuth();
    const navigate=useNavigate();
    const cartItems=useSelector(state=>state.cart?.value)
    const count=getItemCount(cartItems);
    const [anchorEl, setAnchorEl]=useState(null);
    const navigateToCart=()=>{
        navigate("/cart");
    }
    function handleProfileMenuOpen(e){
        setAnchorEl(e.currentTarget);
    }
    const handleMenuClose=()=>{
        setAnchorEl(null);
    }
    const isMenuOpen=Boolean(anchorEl);

    async function logout(){
        
        await signOut();
        navigate("/login");
    }
    
    const renderMenu=(
        <Menu anchorEl={anchorEl} id="user-profile-menu" keepMounted
        transformOrigin={{horizontal:"right", vertical:"top"}} anchorOrigin={{horizontal:"right", vertical:"bottom"}}
        open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    )
  return (
    <>
    <Appbar position="sticky" sx={{
        py:1,

    }}>
        <Toolbar sx={{
            display:"flex",
            gap:2
        }}>
            <Typography variant="h4" color="inherit" sx={{
                display:"flex",

            }}><StyledLink to={"/"}>Avicom</StyledLink></Typography>
            <SearchBar/>
            <Box flexBasis={500} sx={{display:{sx:"none", md:"flex"}}}>
            <IconButton onClick={navigateToCart} size="large" aria-label="shows cart items count" color="inherit">
                <Badge badgeContent={count} color="error">
                    <ShoppingCartSharpIcon/>
                </Badge>
            </IconButton>
            {user?<Button color="inherit" onClick={handleProfileMenuOpen}>{user?.displayName??user.email}</Button>:<Button color="inherit" onClick={()=>navigate("/login")}>Login</Button>}
            </Box>
            
        </Toolbar>
    </Appbar>
    {renderMenu}
    </>
  )
}

export default Header