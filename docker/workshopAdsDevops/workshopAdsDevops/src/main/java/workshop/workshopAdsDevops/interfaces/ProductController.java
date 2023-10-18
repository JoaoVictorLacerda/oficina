package workshop.workshopAdsDevops.interfaces;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import workshop.workshopAdsDevops.application.exception.BadRequestException;
import workshop.workshopAdsDevops.application.exception.InternalServerErrorException;
import workshop.workshopAdsDevops.application.exception.NotFoundException;
import workshop.workshopAdsDevops.application.useCase.ProductUseCase;
import workshop.workshopAdsDevops.domain.Product;
import workshop.workshopAdsDevops.infrastructure.schema.ProductSchema;

import java.util.List;

@RestController
@RequestMapping("/product")
@Controller("ProductController")
@AllArgsConstructor
public class ProductController {

    @Qualifier("ProductUseCase")
    private final ProductUseCase productUseCase;


    @PostMapping
    public ResponseEntity create(@RequestBody ProductSchema productSchema){
        try {

            Product product = this.productUseCase.create(productSchema);

            return ResponseEntity.status(201).body(product);

        }catch (BadRequestException e){
            return ResponseEntity.status(400).body(e.getMessage());

        } catch (InternalServerErrorException e) {
            return ResponseEntity.status(500).body(e.getMessage());

        }
    }
    @GetMapping
    public ResponseEntity getAll(){
        try {

            List<Product> productList = this.productUseCase.getAll();

            return ResponseEntity.status(201).body(productList);

        }catch (InternalServerErrorException e) {
            return ResponseEntity.status(500).body(e.getMessage());

        }
    }

    @GetMapping("/get-by-uuid/{uuid}")
    public ResponseEntity getByUuid(@PathVariable("uuid") String uuid){
        try {

            Product product = this.productUseCase.getByUuid(uuid);

            return ResponseEntity.status(201).body(product);

        }catch (InternalServerErrorException e) {
            return ResponseEntity.status(500).body(e.getMessage());

        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }


}
