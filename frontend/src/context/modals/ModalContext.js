import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({});

export const ModalContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDeviceInfo, setOpenDeviceInfo] = useState(false);
  const [openNewListingModal, setOpenNewListingModal] = useState(false);
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const [openDeleteVehicleModal, setOpenDeleteVehicleModal] = useState(false);
  const [openDeletePropertyModal, setOpenDeletePropertyModal] = useState(false);

  const [state, setState] = useState({
    right: false,
  });
  const [usersDrawerState, setUsersDrawerState] = useState({
    left: false,
  });
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openBackDropVehicle, setOpenBackDropVehicle] = useState(false);
  const [openBackDropProperty, setOpenBackDropProperty] = useState(false);

  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };

  const handleOpenBackDrop = () => {
    setOpenBackDrop(true);
  };

  const handleCloseBackDropVehicle = () => {
    setOpenBackDropVehicle(false);
  };

  const handleOpenBackDropVehicle = () => {
    setOpenBackDropVehicle(true);
  };
  const handleCloseBackDropProperty = () => {
    setOpenBackDropProperty(false);
  };

  const handleOpenBackDropProperty = () => {
    setOpenBackDropProperty(true);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const toggleUsersDrawer = (anchor, open) => (event) => {
    setUsersDrawerState({ ...state, [anchor]: open });
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onOpenSettingsModal = () => {
    setOpenSettings(true);
  };

  const onOpenDeviceModal = () => {
    setOpenDeviceInfo(true);
  };

  const onOpenNewListingModal = () => {
    setOpenNewListingModal(true);
  };

  const onOpenDeleteItemModal = () => {
    setOpenDeleteItemModal(true);
  };
  const onOpenDeleteVehicleModal = () => {
    setOpenDeleteVehicleModal(true);
  };

  const onOpenDeletePropertyModal = () => {
    setOpenDeletePropertyModal(true);
  };

  const onClose = () => setOpen(false);
  const onCloseSettingsModal = () => setOpenSettings(false);
  const onCloseDeviceModal = () => setOpenDeviceInfo(false);
  const onCloseNewListingModal = () => setOpenNewListingModal(false);
  const onCloseDeleteItemModal = () => setOpenDeleteItemModal(false);
  const onCloseDeleteVehicleModal = () => setOpenDeleteVehicleModal(false);
  const onCloseDeletePropertyModal = () => setOpenDeletePropertyModal(false);

  return (
    <ModalContext.Provider
      value={{
        open,
        onOpen,
        onClose,
        state,
        setState,
        toggleDrawer,
        usersDrawerState,
        setUsersDrawerState,
        toggleUsersDrawer,
        openSettings,
        openDeviceInfo,
        openNewListingModal,
        onCloseSettingsModal,
        onOpenSettingsModal,
        onOpenDeviceModal,
        onCloseDeviceModal,
        onOpenNewListingModal,
        onCloseNewListingModal,
        openBackDrop,
        handleCloseBackDrop,
        handleOpenBackDrop,
        openDeleteItemModal,
        onOpenDeleteItemModal,
        onCloseDeleteItemModal,
        openDeleteVehicleModal,
        onOpenDeleteVehicleModal,
        onCloseDeleteVehicleModal,
        openBackDropVehicle,
        handleCloseBackDropVehicle,
        handleOpenBackDropVehicle,
        openDeletePropertyModal,
        onOpenDeletePropertyModal,
        onCloseDeletePropertyModal,
        openBackDropProperty,
        handleCloseBackDropProperty,
        handleOpenBackDropProperty,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { useModal };
