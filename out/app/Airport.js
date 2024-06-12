export default class Airport {
    code;
    latitudeDegrees;
    latitudeMinutes;
    longitudeDegrees;
    longitudeMinutes;
    constructor(code, latitudeDegrees, latitudeMinutes, longitudeDegrees, longitudeMinutes) {
        this.code = code;
        this.latitudeDegrees = latitudeDegrees;
        this.latitudeMinutes = latitudeMinutes;
        this.longitudeDegrees = longitudeDegrees;
        this.longitudeMinutes = longitudeMinutes;
    }
    getCode() {
        return this.code;
    }
    getLatitudeDegrees() {
        return this.latitudeDegrees;
    }
    getLatitudeMinutes() {
        return this.latitudeMinutes;
    }
    getLongitudeDegrees() {
        return this.longitudeDegrees;
    }
    getLongitudeMinutes() {
        return this.longitudeMinutes;
    }
    static calculateDistance(a1, a2) {
        // CONSTANTS USED FOR DISTANCE CALCULATION
        const PI_F = Math.PI;
        const RADIAN_FACTOR = 180.0 / PI_F;
        const EARTH_RADIUS = 3963.0;
        let lat1 = a1.getLatitudeDegrees() + a1.getLatitudeMinutes() / 60.0;
        lat1 = lat1 / RADIAN_FACTOR;
        let long1 = -(a1.getLongitudeDegrees() + a1.getLongitudeMinutes() / 60.0);
        long1 = long1 / RADIAN_FACTOR;
        let lat2 = a2.getLatitudeDegrees() + a2.getLatitudeMinutes() / 60.0;
        lat2 = lat2 / RADIAN_FACTOR;
        let long2 = -(a2.getLongitudeDegrees() + a2.getLongitudeMinutes() / 60.0);
        long2 = long2 / RADIAN_FACTOR;
        let x = (Math.sin(lat1) * Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1));
        let x2 = Math.sqrt(1.0 - (x * x)) / x;
        let distance = EARTH_RADIUS * Math.atan(x2);
        return distance;
    }
}
//# sourceMappingURL=Airport.js.map