package workshop.workshopAdsDevops.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import workshop.workshopAdsDevops.infrastructure.schema.ProductSchema;

@Repository("ProductRepository")
public interface ProductRepository extends JpaRepository<ProductSchema, String> {
    public ProductSchema findByUuid(String uuid);
}
