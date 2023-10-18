package workshop.workshopAdsDevops.infrastructure.schema;
import com.fasterxml.uuid.Generators;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
@Setter
@Entity(name="product")
public class ProductSchema implements Serializable {

    @Id
    private String uuid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private float price;

    public ProductSchema() {
        this.uuid = Generators.randomBasedGenerator().generate().toString();;
    }
}
