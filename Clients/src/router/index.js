import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from '../views/Dashboard';
import DashboardOld from '../views/DashboardOld';
import ProblemHistory from '../views/ProblemHistory'
import EditProblem from '../views/EditProblem'
import PdfViewer from '../views/PdfViewer'
import Henkaten from '../views/Henkaten'
import PdfViewerSmallProb from '../views/PdfViewerSmallProb'
import PdfViewerLongProb from '../views/PdfViewerLongProb'
import RealtimePareto from '../views/RealtimePareto'
import RealtimeParetoDesktop from '../views/RealtimeParetoDesktop'
import RegisterNewMachine from '../views/RegisterNewMachine'
import DetailsLine from '../views/DetailsLine'
import SymptompMgmt from '../views/SymptompMgmt'
import SymptompDesktop from '../views/SymptompDesktop'
import TpmMonitoring from "../views/TpmMonitoring";
import LedgerTpm from "../views/LedgerTpm";
import CmFollowup from "../views/CmFollowup";
import CycleTimeMachines from "../views/CycleTimeMachines"
import Login from "../views/Login"
import Register from "../views/Register"
import QcMonitoring from "../views/QcMonitoring"
import QcMonitoringDetails from "../views/QcMonitoringDetails"
import SummaryWeekly from "../views/SummaryWeekly"
import MappingLine from "../views/Mapping/MappingLine"


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        // name: 'Login',
        component: Login
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    },
    // {
    //     path: '/',
    //     name: 'Dashboard',
    //     component: DashboardOld
    // },
    {
        path: '/',
        component: () =>
            import ('@/views/Home.vue'),
        children: [{
                path: '',
                name: 'DashboarOld',
                component: DashboardOld
            },
            {
                path: '/MappingLine',
                name: 'MappingLine',
                component: MappingLine
            },
            {
                path: '/detailsLine',
                name: 'DetailsLine',
                component: DetailsLine,
                props: true
            },
            {
                path: '/problemHistory',
                name: 'ProblemHistory',
                component: ProblemHistory
            },
            {
                path: '/tpmMonitoring',
                name: 'TpmMonitoring',
                component: TpmMonitoring,
            },
            {
                path: '/tpmMonitoring/ledger',
                name: 'Ledger',
                component: LedgerTpm
            },
            {
                path: '/symptompMgmt',
                name: 'SymptompMgmt',
                component: SymptompMgmt
            },
            {
                path: '/symptompDesktop',
                name: 'SymptompDesktop',
                component: SymptompDesktop
            },
            {
                path: '/cmFollowup',
                name: 'CmFollowup',
                component: CmFollowup
            },
            {
                path: '/realtimePareto',
                name: 'RealtimePareto',
                component: RealtimePareto
            },
            {
                path: '/realtimeParetoDesktop',
                name: 'RealtimeParetoDesktop',
                component: RealtimeParetoDesktop
            },
            {
                path: '/editProblem',
                name: 'EditProblem',
                component: EditProblem
            },
            {
                path: '/registerNewMachine',
                name: 'RegisterNewMachine',
                component: RegisterNewMachine
            },
            {
                path: '/pdfViewer',
                name: 'PdfViewer',
                component: PdfViewer
            },
            {
                path: '/pdfViewerSmall',
                name: 'PdfViewerSmallProb',
                component: PdfViewerSmallProb
            },
            {
                path: '/pdfViewerLong',
                name: 'PdfViewerLongProb',
                component: PdfViewerLongProb
            },
            {
                path: '/henkaten',
                name: 'Henkaten',
                component: Henkaten
            },
            {
                path: '/cycleTimeMachine',
                name: 'CycleTimeMachines',
                component: CycleTimeMachines
            },
            {
                path: '/qcMonitoring',
                name: 'QcMonitoring',
                component: QcMonitoring,
            },
            {
                path: '/qcMonitoring/details',
                name: 'CycleTimeMachines',
                component: QcMonitoringDetails
            },
            {
                path: '/summaryWeekly',
                name: 'SummaryWeekly',
                component: SummaryWeekly
            },
        ]
    },
    {
        path: '/tps',
        name: 'Tps',
        redirect: '/tps/dashboard',
        component: () =>
            import ('@/views/Tps/Tps.vue'),
        children: [{
            path: 'dashboard',
            name: 'DashboardTps',
            component: () =>
                import ('@/views/Tps/DashboardTps.vue'),
        }, {
            path: 'detail-data',
            name: 'DetailDataTps',
            component: () =>
                import ('@/views/Tps/DetailDataTps.vue'),
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router