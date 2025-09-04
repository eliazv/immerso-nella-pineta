import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbSEOProps {
  items?: BreadcrumbItem[];
}

const BreadcrumbSEO = ({ items }: BreadcrumbSEOProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs based on current path if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/" }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      let label = '';
      switch (segment) {
        case 'pineta3':
          label = 'Appartamento Pineta 3';
          break;
        case 'pineta8':
          label = 'Appartamento Pineta 8';
          break;
        case 'gallery':
          label = 'Galleria Foto';
          break;
        case 'book':
          label = 'Prenota Ora';
          break;
        case 'attractions':
          label = 'Attrazioni Pinarella';
          break;
        case 'rules':
          label = 'Regole Casa';
          break;
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
      
      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
        isActive: isLast
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();
  
  // Generate JSON-LD structured data for breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://immersonellapineta.it${item.href}` : undefined
    }))
  };

  if (breadcrumbItems.length <= 1) return null;

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Visual breadcrumb navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className="mb-6"
        role="navigation"
      >
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
              {item.href ? (
                <Link
                  to={item.href}
                  className="flex items-center hover:text-pine-dark transition-colors duration-200"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center text-pine-dark font-medium">
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default BreadcrumbSEO;