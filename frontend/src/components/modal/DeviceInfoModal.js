import DeviceInfo from "../deviceInfo/DeviceInfo";
import DiskUsage from "../diskQuata/DiskQuata";
import ModalUnstyled from "./Modal";

const DeviceInfoModal = ({ open, setOpen }) => {
  return (
    <ModalUnstyled open={open} onClose={setOpen}>
      <DeviceInfo />
      <br />
      <DiskUsage />
    </ModalUnstyled>
  );
};

export default DeviceInfoModal;
