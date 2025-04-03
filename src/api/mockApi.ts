import { Product } from "../types/Product";

// Default products data
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Épée de feu",
    description: "Une épée légendaire forgée dans les flammes du dragon",
    price: 1200,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "2",
    name: "Potion de santé",
    description: "Restaure instantanément 50 points de vie",
    price: 100,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "3",
    name: "Bouclier de protection",
    description: "Réduit les dégâts subis de 30%",
    price: 800,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1531751519034-8c7e11488899?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "4",
    name: "Arc enchanté",
    description: "Un arc qui ne rate jamais sa cible",
    price: 950,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "5",
    name: "Potion de mana",
    description: "Récupère 75 points de mana",
    price: 150,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1602928298849-325cec8771c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "6",
    name: "Armure en diamant",
    description: "L'armure la plus résistante du royaume",
    price: 2000,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "7",
    name: "Bâton de foudre",
    description: "Invoque la puissance des cieux",
    price: 1500,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1564979268369-9fa149f43fe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "8",
    name: "Masque effrayant",
    description: "Un masque qui terrifie vos ennemis",
    price: 500,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1634316427425-582a17fc5c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "9",
    name: "Chapeau de Père Noël",
    description: "Joyeux Noël à tous !",
    price: 300,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store3",
  },
  {
    id: "10",
    name: "Dague d'ombre",
    description: "Une dague qui permet de se fondre dans les ombres",
    price: 850,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "11",
    name: "Potion d'invisibilité",
    description: "Devient invisible pendant 30 secondes",
    price: 300,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1612627038504-5d9765c5a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "12",
    name: "Casque du courage",
    description: "Augmente la résistance à la peur de 50%",
    price: 650,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1595079664698-33be41bc7566?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "13",
    name: "Marteau de guerre",
    description: "Un marteau massif qui peut briser les armures",
    price: 1100,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1528111929008-9d5f01e7b33d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "14",
    name: "Élixir de force",
    description: "Augmente temporairement la force de 20 points",
    price: 200,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "15",
    name: "Gants de précision",
    description: "Améliore la précision des attaques à distance",
    price: 450,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "16",
    name: "Grimoire ancien",
    description: "Contient des sorts oubliés depuis des siècles",
    price: 1800,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "17",
    name: "Bottes de célérité",
    description: "Augmente la vitesse de déplacement de 15%",
    price: 550,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1554238113-04c589be17ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "18",
    name: "Amulette de protection",
    description: "Offre une résistance aux sorts négatifs",
    price: 750,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1602529139423-55d9c5cf8a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "19",
    name: "Potion de résurrection",
    description: "Ramène à la vie avec 50% de santé",
    price: 500,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1626722891086-512374bad5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "20",
    name: "Lance du chasseur",
    description: "Inflige des dégâts supplémentaires aux créatures sauvages",
    price: 780,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1583998364028-9e8678b65dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "21",
    name: "Anneau d'invisibilité",
    description: "Devient invisible pendant une courte durée lorsqu'activé",
    price: 2500,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "22",
    name: "Potion d'agilité",
    description: "Augmente l'agilité de 30 points pendant 5 minutes",
    price: 180,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1596813362035-3edce8b18948?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "23",
    name: "Hache de bataille",
    description: "Une hache à double tranchant capable de fendre les boucliers",
    price: 920,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1548245420-ac5353f519d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "24",
    name: "Cape d'invisibilité",
    description: "Rend partiellement invisible dans l'obscurité",
    price: 1750,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1551710029-607e06bd45ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "25",
    name: "Sceptre de domination",
    description:
      "Permet de contrôler brièvement les créatures de faible niveau",
    price: 3000,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1612035397036-85014e75268b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "26",
    name: "Élixir de régénération",
    description: "Régénère 5 points de vie par seconde pendant 1 minute",
    price: 320,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "27",
    name: "Cuirasse des ténèbres",
    description: "Armure lourde qui absorbe les dégâts magiques",
    price: 1680,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1560104710-6f1aa7001af6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "28",
    name: "Dague empoisonnée",
    description: "Inflige des dégâts de poison pendant 10 secondes",
    price: 670,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1622442346535-01dabda5d272?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "29",
    name: "Boule de cristal",
    description: "Révèle les ennemis cachés dans un rayon de 50 mètres",
    price: 420,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1518889735218-3e3c35345df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "30",
    name: "Potion de métamorphose",
    description: "Transforme en créature aléatoire pendant 2 minutes",
    price: 280,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1610149579-15129de3d5ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "31",
    name: "Arbalète de précision",
    description: "Tire des carreaux avec une précision mortelle",
    price: 1350,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1595952385999-57677bf06594?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "32",
    name: "Bandeau de sagesse",
    description: "Augmente l'intelligence et la sagesse de 15 points",
    price: 880,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "33",
    name: "Baguette de feu",
    description: "Lance des boules de feu qui infligent des dégâts de zone",
    price: 1250,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "34",
    name: "Élixir d'endurance",
    description: "Augmente l'endurance de 40 points pendant 10 minutes",
    price: 230,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1600709004591-3e105a410600?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "35",
    name: "Jambières de vitesse",
    description: "Augmente la vitesse de déplacement de 20%",
    price: 940,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1523586362522-f84a2e4f4cd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "36",
    name: "Parchemin de téléportation",
    description: "Permet de se téléporter instantanément à un endroit visité",
    price: 400,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1519791883288-d90b3356e6a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "37",
    name: "Masse d'écrasement",
    description: "Une masse lourde qui peut étourdir les ennemis",
    price: 830,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "38",
    name: "Potion d'invulnérabilité",
    description: "Rend invulnérable pendant 5 secondes",
    price: 950,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1578496479932-143fc3bd2e36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "39",
    name: "Heaume enchanté",
    description: "Protège contre les contrôles mentaux",
    price: 1450,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1599800926454-48b95e7f4e62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "40",
    name: "Lame spectrale",
    description: "Une épée qui peut frapper les ennemis éthérés",
    price: 1950,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1572215122942-75c7fc558b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store1",
  },
  {
    id: "41",
    name: "Lanterne des âmes",
    description: "Révèle les fantômes et les créatures invisibles",
    price: 520,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "42",
    name: "Potion de vol",
    description: "Permet de voler pendant 3 minutes",
    price: 350,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1635368755456-33b7ec7c2b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "43",
    name: "Gantelets de puissance",
    description: "Augmente les dégâts physiques de 25%",
    price: 1100,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1557687645-6280a5e69cd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "44",
    name: "Épée runique",
    description: "Une épée gravée de runes magiques anciennes",
    price: 1600,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1594225057101-87f59618581f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "45",
    name: "Élixir de vision nocturne",
    description: "Permet de voir dans l'obscurité complète",
    price: 270,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1573403030122-c61d3f834ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "46",
    name: "Écu de réflexion",
    description: "Renvoie partiellement les sorts lancés contre vous",
    price: 1850,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1577017040065-650ee4d43339?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "47",
    name: "Cristal d'invocation",
    description: "Invoque un familier qui combat à vos côtés",
    price: 2200,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "misc",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "48",
    name: "Fléau des morts-vivants",
    description: "Inflige des dégâts doublés aux morts-vivants",
    price: 980,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1533585902860-416feca8a2d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "weapons",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "49",
    name: "Potion de chance",
    description: "Augmente la chance de trouver des objets rares",
    price: 450,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1603189817729-091f92137a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "potions",
    isActive: true,
    storeId: "store2",
  },
  {
    id: "50",
    name: "Armure de gardien",
    description:
      "Réduit les dégâts subis et augmente les dégâts infligés aux ennemis attaquant vos alliés",
    price: 2100,
    currency: "gold",
    imageUrl:
      "https://images.unsplash.com/photo-1548743189-1596abe4c8c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
    category: "armor",
    isActive: true,
    storeId: "store2",
  },
];

// localStorage key for products
const PRODUCTS_STORAGE_KEY = "store_products";

// Helper functions for localStorage
const getProducts = (): Product[] => {
  try {
    // Initialize localStorage with default products if it doesn't exist
    if (!localStorage.getItem(PRODUCTS_STORAGE_KEY)) {
      localStorage.setItem(
        PRODUCTS_STORAGE_KEY,
        JSON.stringify(defaultProducts)
      );
    }

    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting products from localStorage:", error);
    return [...defaultProducts]; // Fallback to default data
  }
};

const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to localStorage:", error);
  }
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API functions
export const fetchProducts = async (storeId?: string): Promise<Product[]> => {
  await delay(800);
  const products = getProducts();
  if (storeId) {
    return products.filter((p) => p.storeId === storeId);
  }
  return [...products];
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  await delay(500);
  const products = getProducts();
  const product = products.find((p) => p.id === id);
  return product || null;
};

export const updateProduct = async (
  updatedProduct: Product
): Promise<Product> => {
  await delay(600);
  const products = getProducts();
  const index = products.findIndex((p) => p.id === updatedProduct.id);

  if (index === -1) {
    throw new Error(`Product with ID ${updatedProduct.id} not found`);
  }

  products[index] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
};

export const createProduct = async (
  newProduct: Omit<Product, "id">
): Promise<Product> => {
  await delay(600);
  const products = getProducts();

  // Generate a new ID (simplistic approach)
  const maxId = Math.max(...products.map((p) => parseInt(p.id, 10)));
  const nextId = (maxId + 1).toString();

  const productWithId = { ...newProduct, id: nextId } as Product;

  products.push(productWithId);
  saveProducts(products);
  return productWithId;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  await delay(600);
  const products = getProducts();
  const initialLength = products.length;

  const filteredProducts = products.filter((p) => p.id !== id);

  if (filteredProducts.length === initialLength) {
    return false; // No product was removed
  }

  saveProducts(filteredProducts);
  return true;
};

// Reset to default products (useful for testing)
export const resetToDefaultProducts = async (): Promise<void> => {
  await delay(300);
  saveProducts(defaultProducts);
};
