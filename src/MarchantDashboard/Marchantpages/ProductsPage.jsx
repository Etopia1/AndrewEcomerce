import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

import Header from "../Marchantcomponents/common/Header";
import StatCard from "../Marchantcomponents/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../Marchantcomponents/overview/CategoryDistributionChart";
import SalesTrendChart from "../Marchantcomponents/products/SalesTrendChart";
import ProductsTable from "../Marchantcomponents/products/ProductsTable";

const ProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [totalRevenue, setTotalRevenue] = useState(0);
	const [topSelling, setTopSelling] = useState(0);
	const [loading, setLoading] = useState(true);

	const token = useSelector((state) => state.marChantData.token);
	const id = useSelector((state) => state.marChantData._id);

	useEffect(() => {
		if (token) {
			fetchProducts();
			fetchRevenue();
			fetchTopSelling();
		}
	}, [token]);

	// ✅ Fetch all merchant products
	const fetchProducts = async () => {
		try {
			const res = await axios.get("https://andrewecomerceback.onrender.com/api/v1/allproducts", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setProducts(res.data.data || []);
		} catch (err) {
			console.error("Error fetching products:", err);
			toast.error("Failed to fetch products");
		}
	};

	// ✅ Fetch merchant total revenue
	const fetchRevenue = async () => {
		try {
			const res = await axios.get(`https://andrewecomerceback.onrender.com/api/v1/merchant/earnings/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setTotalRevenue(res.data.summary?.totalEarnings || 0);
		} catch (err) {
			console.error("Error fetching revenue:", err);
			toast.error("Failed to fetch revenue");
		} finally {
			setLoading(false);
		}
	};

	// ✅ Fetch Top Selling Products
	const fetchTopSelling = async () => {
		try {
			const res = await axios.get("https://andrewecomerceback.onrender.com/api/v1/top-selling", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = res.data?.data || [];
			// Top-selling count (number of top products)
			setTopSelling(data.length);
		} catch (err) {
			console.error("Error fetching top-selling products:", err);
			toast.error("Failed to fetch top-selling products");
		}
	};

	return (
		<div className="flex-1 overflow-auto relative z-10">
			<Header title="Products" />

			<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
				{/* STATS */}
				<motion.div
					className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name="Total Products"
						icon={Package}
						value={loading ? "..." : products.length}
						color="#6366F1"
					/>
					<StatCard
						name="Top Selling"
						icon={TrendingUp}
						value={loading ? "..." : topSelling}
						color="#10B981"
					/>
					<StatCard name="Low Stock" icon={AlertTriangle} value={23} color="#F59E0B" />
					<StatCard
						name="Total Revenue"
						icon={DollarSign}
						value={loading ? "..." : totalRevenue}
						color="#EF4444"
					/>
				</motion.div>

				{/* Products Table */}
				<ProductsTable products={products} />

				{/* Charts */}
				<div className="grid grid-col-1 lg:grid-cols-2 gap-8">
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};

export default ProductsPage;
