<template>
    <div>
        <canvas ref="chart"></canvas>
    </div>
</template>
  
<script lang="ts">
import { db } from "../main";
import { collection, doc, getDoc } from "firebase/firestore";
import Chart from "chart.js/auto";

interface Item {
    item_name: string;
    price: number;
    image_url: string;
    description: string;
    user_id: string;
    location: string;
    loadedAt: number[];
}

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            item: null as Item | null,
        };
    },
    async mounted() {
        try {
            const listingsRef = collection(db, "listings");
            const itemDoc = doc(listingsRef, this.id);
            const itemDocData = await getDoc(itemDoc);
            this.item = itemDocData.exists() ? (itemDocData.data() as Item) : null;

            if (this.item) {
                const viewsPerDay: { [key: string]: number } = {};
                for (const timestamp of this.item.loadedAt) {
                    const date = new Date(timestamp);
                    const dateString = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    if (viewsPerDay[dateString]) {
                        viewsPerDay[dateString]++;
                    } else {
                        viewsPerDay[dateString] = 1;
                    }
                }

                const chartData = {
                    labels: Object.keys(viewsPerDay),
                    datasets: [
                        {
                            label: "Views",
                            data: Object.values(viewsPerDay),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                    ],
                };

                new Chart(this.$refs.chart as HTMLCanvasElement, {
                    type: "bar",
                    data: chartData,
                });
            }
        } catch (error) {
            console.error(error);
        }
    },
};
</script>