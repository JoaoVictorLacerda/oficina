package workshop.workshopAdsDevops.application.exception;

public class BadRequestException extends Exception{
    public BadRequestException(String message) {
        super(message);
    }
}
