package workshop.workshopAdsDevops.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/healthCheck")
public class HealthCheckInterface {

    @GetMapping
    public ResponseEntity healthCheck(){
        return ResponseEntity.status(200).body("TESTE");
    }
}
