package workshop.workshopAdsDevops.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import workshop.workshopAdsDevops.infrastructure.schema.ProductSchema;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Getter
@Setter
public class Product {
    private String uuid;
    private String name;
    private float price;

    public Product(ProductSchema productSchema) {
        this.price = productSchema.getPrice();
        this.name = productSchema.getName();
        this.uuid = productSchema.getUuid();
    }

    public static List<Product> convert(List<ProductSchema> classes){
        return classes.stream().map(Product::new).collect(Collectors.toList());
    }
}
