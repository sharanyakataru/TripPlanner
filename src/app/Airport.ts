export default class Airport {
    private code: string;
    private latitudeDegrees: number;
    private latitudeMinutes: number;
    private longitudeDegrees: number;
    private longitudeMinutes: number;

    public constructor(code: string, latitudeDegrees: number, latitudeMinutes: number, longitudeDegrees: number, longitudeMinutes: number) {
        this.code = code;
        this.latitudeDegrees = latitudeDegrees;
        this.latitudeMinutes = latitudeMinutes;
        this.longitudeDegrees = longitudeDegrees;
        this.longitudeMinutes = longitudeMinutes;
    }

    public getCode(): string {
        return this.code;
    }

    public getLatitudeDegrees(): number {
        return this.latitudeDegrees;
    }

    public getLatitudeMinutes(): number {
        return this.latitudeMinutes;
    }

    public getLongitudeDegrees(): number {
        return this.longitudeDegrees;
    }

    public getLongitudeMinutes(): number {
        return this.longitudeMinutes;
    }

    static calculateDistance(a1: Airport, a2: Airport): number {
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
