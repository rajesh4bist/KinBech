package com.example.eCommerce.ProductsInfo.ProductController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/products")
@RestController
public class ProductController {
    @PostMapping("/add")
    public void addProduct() {
        
    }
}
