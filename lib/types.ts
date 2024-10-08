type Device = {
    id: number;
    device_name: string;
    device_id: string;
    device_type: 'KIOSK' | 'PRINTER' | 'POS' | 'OTHER';
    status: 'ACTIVE' | 'INACTIVE';
    restaurant_id: number;
    restaurant: Restaurant;
    created_at: Date;
    updated_at: Date;
  };

  interface DeviceCreateRequestBody {
    device_name: string;
    device_id: string;
    device_type: 'KIOSK' | 'PRINTER' | 'POS' | 'OTHER';
    restaurant_id: number;
    status?: 'ACTIVE' | 'INACTIVE';
  }
  
  interface DeviceCreateResponse {
    message: string;
    device: {
      id: number;
      device_name: string;
      device_id: string;
      device_type: 'KIOSK' | 'PRINTER' | 'POS' | 'OTHER';
      status: 'ACTIVE' | 'INACTIVE';
      restaurant_id: number;
      created_at: Date;
      updated_at: Date;
    };
  }

  interface DeviceUpdateRequestBody {
    device_name: string;
    device_id: string;
    device_type: 'KIOSK' | 'PRINTER' | 'POS' | 'OTHER';
    status?: 'ACTIVE' | 'INACTIVE';
    restaurant_id: number;
  }
  
  interface DeviceUpdateResponse {
    message: string;
    device: {
      id: number;
      device_name: string;
      device_id: string;
      device_type: 'KIOSK' | 'PRINTER' | 'POS' | 'OTHER';
      status: 'ACTIVE' | 'INACTIVE';
      restaurant_id: number;
      created_at: Date;
      updated_at: Date;
    };
  }

interface DeviceResponse {
  id: number;
  device_name: string;
  device_id: string;
  device_type: 'KIOSK' | 'PRINTER' | 'POS' | 'OTHER';
  status: 'ACTIVE' | 'INACTIVE';
  restaurant_id: number;
  created_at: Date;
  updated_at: Date;
}
interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  message?: string;
  restaurant?: Restaurant;
}

interface Restaurant {
  id?: number;
  name?: string;
  devices?: Device[];
}

interface SuccessResponse {
  restaurants?: Restaurant[];
}

interface UpdateRestaurantRequest {
  name?: string;
}

interface SuccessResponse {
  message?: string;
  updatedRestaurant?: Restaurant;
}