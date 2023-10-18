package workshop.workshopAdsDevops.application.useCase;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import workshop.workshopAdsDevops.application.exception.BadRequestException;
import workshop.workshopAdsDevops.application.exception.InternalServerErrorException;
import workshop.workshopAdsDevops.application.exception.NotFoundException;
import workshop.workshopAdsDevops.domain.Product;
import workshop.workshopAdsDevops.infrastructure.repository.ProductRepository;
import workshop.workshopAdsDevops.infrastructure.schema.ProductSchema;

import java.util.List;


@AllArgsConstructor
@Service("ProductUseCase")
public class ProductUseCase {

    @Qualifier("ProductRepository")
    private final ProductRepository productRepository;

    public Product getByUuid(String productUuid) throws InternalServerErrorException, NotFoundException {
        try{

            ProductSchema productSchema =  this.productRepository.findByUuid(productUuid);

            if(productSchema == null){
                throw new NotFoundException(String.format("Product with uuid %s not found", productUuid));
            }
            return new Product(productSchema);

        }catch (NotFoundException e){

            throw e;

        } catch (Exception e){
            throw new InternalServerErrorException(e.getMessage());

        }
    }

    public Product create(ProductSchema product) throws InternalServerErrorException,BadRequestException {
        return this.createAndUpdate(product);
    }
    public Product update(ProductSchema product) throws InternalServerErrorException,BadRequestException {
        return this.createAndUpdate(product);
    }

    public List<Product> getAll() throws InternalServerErrorException {
        try{

            List<ProductSchema> productSchemaList =  this.productRepository.findAll();
            return Product.convert(productSchemaList);

        }catch (Exception e){
            throw new InternalServerErrorException(e.getMessage());

        }
    }

    private Product createAndUpdate(ProductSchema product) throws InternalServerErrorException,BadRequestException {
        try{

            ProductSchema productSchema =  this.productRepository.save(product);
            if(productSchema == null){
                throw new BadRequestException(String.format("Save product with error %s not found", product));
            }
            return new Product(productSchema);
        }catch (BadRequestException e){

            throw e;

        } catch (Exception e){
            throw new InternalServerErrorException(e.getMessage());


        }
    }


}
