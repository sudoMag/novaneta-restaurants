interface Device<T> {
  id: string;
  name: T;
  deviceType: string;
  profileImg: string;
  role: string;
}

export default Device;
