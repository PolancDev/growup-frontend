import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { AnalyticsService } from '../../core/services/analytics.service';
import type { AnalyticsSummary, CoursePerformance, RevenueData, CourseReview } from '../../core/models/analytics.models';
import { STATUS_SEVERITY_MAP } from '../../core/models/courses.models';

export default function AnaliticasPage() {
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [performance, setPerformance] = useState<CoursePerformance[]>([]);
    const [reviews, setReviews] = useState<CourseReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [s, r, p, rev] = await Promise.all([
                    AnalyticsService.getSummary(),
                    AnalyticsService.getRevenueTrends(),
                    AnalyticsService.getCoursePerformance(),
                    AnalyticsService.getReviews()
                ]);
                setSummary(s);
                setRevenueData(r);
                setPerformance(p);
                setReviews(rev);
            } catch (error) {
                console.error('Error loading analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const revenueChartData = {
        labels: revenueData.map(d => d.month),
        datasets: [
            {
                label: 'Ingresos (€)',
                data: revenueData.map(d => d.revenue),
                fill: true,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
            }
        ]
    };

    const enrollmentChartData = {
        labels: revenueData.map(d => d.month),
        datasets: [
            {
                label: 'Inscripciones',
                data: revenueData.map(d => d.enrollments),
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            x: {
                grid: { display: false }
            }
        },
        maintainAspectRatio: false
    };

    const statusBody = (rowData: CoursePerformance) => {
        return <Tag value={rowData.status} severity={STATUS_SEVERITY_MAP[rowData.status]} />;
    };

    const currencyBody = (rowData: CoursePerformance) => {
        return rowData.revenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    };

    const ratingBody = (rowData: CoursePerformance) => {
        return (
            <div className="flex items-center gap-1 font-bold">
                <i className="pi pi-star-fill text-yellow-400 text-xs"></i>
                {(rowData.rating || 0).toFixed(1)}
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-8 animate-fade-in pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface/80 dark:bg-surface/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
                <div>
                    <h1 className="text-4xl font-black text-grow dark:text-grow font-sans tracking-tight mb-2">
                        Analíticas
                    </h1>
                    <p className="text-gray-500 font-sans dark:text-gray-400 ">Panel de rendimiento y crecimiento de tus contenidos</p>
                </div>
            </header>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Ingresos Totales', value: summary?.totalRevenue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }), icon: 'pi-wallet', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
                    { label: 'Estudiantes Totales', value: summary?.totalStudents.toLocaleString(), icon: 'pi-users', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
                    { label: 'Valoración Media', value: (summary?.averageRating || 0).toFixed(2), icon: 'pi-star-fill', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-950/20' },
                    { label: 'Cursos Activos', value: summary?.activeCourses, icon: 'pi-book', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' }
                ].map((kpi, idx) => (
                    <div key={idx} className="bg-surface dark:bg-surface p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center`}>
                            <i className={`pi ${kpi.icon} ${kpi.color} text-xl`}></i>
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{kpi.label}</p>
                            <p className="text-2xl font-black text-text dark:text-text">{loading ? '...' : kpi.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 h-[400px]">
                    <h2 className="text-lg font-black text-text dark:text-text mb-6 uppercase tracking-widest font-sans italic opacity-80">Evolución de Ingresos</h2>
                    <div className="h-64">
                        <Chart type="line" data={revenueChartData} options={chartOptions} />
                    </div>
                </section>
                <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 h-[400px]">
                    <h2 className="text-lg font-black text-text dark:text-text mb-6 uppercase tracking-widest font-sans italic opacity-80">Nuevas Inscripciones</h2>
                    <div className="h-64">
                        <Chart type="bar" data={enrollmentChartData} options={chartOptions} />
                    </div>
                </section>
            </div>

            {/* Course Performance Table */}
            <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <h2 className="text-xl font-black text-text dark:text-text mb-8 flex items-center gap-2 font-sans italic uppercase tracking-tighter">
                    Rendimiento por Curso
                </h2>
                <DataTable value={performance} loading={loading}
                    className="p-datatable-sm"
                    rowClassName={() => 'hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors'}
                >
                    <Column field="courseName" header="CURSO" sortable className="font-bold py-4 min-w-[300px]" />
                    <Column field="status" header="ESTADO" body={statusBody} sortable className="py-4" />
                    <Column field="students" header="ALUMNOS" sortable className="text-gray-500 dark:text-gray-400 py-4" />
                    <Column field="revenue" header="INGRESOS" body={currencyBody} sortable className="font-black text-emerald-600 dark:text-emerald-400 py-4" />
                    <Column field="rating" header="VALORACIÓN" body={ratingBody} sortable className="py-4" />
                </DataTable>
            </section>

            {/* Reviews Section */}
            <section className="bg-surface dark:bg-surface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-black text-text dark:text-text mb-8 flex items-center gap-2 font-sans italic uppercase tracking-tighter">
                    Últimas Reseñas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="p-6 rounded-3xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-bold text-text mb-1">{review.studentName || 'Estudiante Anónimo'}</p>
                                        <p className="text-xs text-grow font-bold uppercase tracking-wider opacity-70">{review.courseName}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                                        <i className="pi pi-star-fill text-xs"></i>
                                        {review.rating.toFixed(1)}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm italic leading-relaxed">
                                    "{review.comment}"
                                </p>
                                <div className="mt-4 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                                    {new Date(review.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                            <i className="pi pi-comments text-4xl text-gray-300 mb-3 block"></i>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No hay reseñas todavía</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}