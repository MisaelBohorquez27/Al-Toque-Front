import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { getResponsiveColumns } from "../types/responsive";
import type { ServiceItem } from "../types";
import { IdCard, Signature } from "lucide-react";
import { HomeLayout } from "../components/layout/home_layout";
import { Header } from "../components/ui/header";
import { ServiceCard } from "../components/service_card";

export const OwnerServices: React.FC = () => {
  const [columns, setColumns] = useState(2);
  //@ts-checkconst [activeServiceId, setActiveServiceId] = useState<string>('identity');

  useEffect(() => {
    const handleResize = () => {
      setColumns(getResponsiveColumns(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIdentityVerification = () => {
    //  setActiveServiceId('identity');
    console.log("Navigate to Identity Verification");
    // Aquí iría la navegación
    alert("Navigate to Identity Verification");
  };

  const handleElectronicSignature = () => {
    //  setActiveServiceId('signature');
    console.log("Navigate to Electronic Signature");
    // Aquí iría la navegación
    alert("Navigate to Electronic Signature Contract");
  };

  const services: ServiceItem[] = [
    {
      id: "identity",
      title: "Identity Verification",
      description:
        "Verify your identity with government ID and personal information",
      icon: IdCard,
      color: "#3B82F6",
      onTap: handleIdentityVerification,
    },
    {
      id: "signature",
      title: "Electronic Signature",
      description: "Create and manage your digital signature for contracts",
      icon: Signature,
      color: "#8B5CF6",
      onTap: handleElectronicSignature,
    },
  ];

  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  const selectedBottomNavIndex = () => {
    // En una app real, esto se basaría en el router actual
    return 3; // Services tab
  };

  const navigateByIndex = (index: number) => {
    console.log(`Navigate to tab ${index}`);
    // Aquí iría la navegación real
    switch (index) {
      case 0:
        alert("Navigate to Home");
        break;
      case 1:
        alert("Navigate to Contracts");
        break;
      case 2:
        alert("Navigate to Properties");
        break;
      case 3:
        // Already on Services
        break;
      case 4:
        alert("Navigate to Settings");
        break;
    }
  };

  return (
    <HomeLayout
      currentRoute="/owner/services"
      selectedBottomNavIndex={selectedBottomNavIndex()}
      onBottomNavTapped={navigateByIndex}
    >
      <div className="animate-fade-in">
        <Header />
        {/* Aqui habra un titulo */}
        <div className="mt-6 md:mt-8 lg:mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-slate-950 md:text-xl lg:text-3xl">
            Servicios
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            Aquí puedes gestionar tus servicios de verificación de identidad y
            firma electrónica, para agilizar tus contratos y trámites.
          </p>
        </div>
        {/* Aquí va el grid de servicios */}
        <div className="mt-6 md:mt-8 lg:mt-12 flex">
          <div className={clsx("grid gap-4 md:gap-6", getGridCols())}>
            {services.map((service, index) => (
              <div
                key={service.id}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <ServiceCard item={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};
