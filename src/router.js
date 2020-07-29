import Home from './views/home.vue';
import Login from './views/auth/login.vue';
import Register from './views/auth/register.vue';
import PatientHome from './views/patient/home.vue';
import PatientProfile from './views/patient/profile.vue';
import PatientDoctorRequests from './views/patient/requests.vue';
import Layout from './views/layout/layout.vue';
import DoctorHome from './views/doctor/home.vue';
import DoctorProfile from './views/doctor/profile.vue';
import DoctorPatientList from './views/doctor/patients.vue';
import DoctorPatientRecords from './views/doctor/patient-records.vue';
import DoctorPatientRecordView from './views/doctor/patient-record.vue';
import DoctorPatientRecordsNew from './views/doctor/patient-records-new.vue';
import DoctorPatientInfo from './views/doctor/patient-info.vue';
import DoctorAddPatient from './views/doctor/add-patient.vue';
import BlockRoute from './views/blockchain-route.vue';
import Blockchain from './views/blockchain.vue';
import BlockExplorer from './views/block-explorer.vue';

export default [
	{path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/blockchain-route', component: BlockRoute},
    {path: '/blockchain', component: Blockchain},
    {path: '/block-explorer', component: BlockExplorer},
    {path: '/register', component: Register},
	{path: '/patient/:patientID', component: Layout,  meta: {requiresAuth: true}, children: [
        {
            path: 'dashboard',
            name: 'patient-home',
            component: PatientHome
        },
        {
            path: 'profile',
            name: 'patient-profile',
            component: PatientProfile
        },
        {
            path: 'requests',
            name: 'requests',
            component: PatientDoctorRequests
        },
    ]},
    {path: '/doctor/:doctorID', component: Layout,  meta: {requiresAuth: true}, children: [
        {
            path: 'dashboard',
            name: 'doctor-home',
            component: DoctorHome
        },
        {
            path: 'profile',
            name: 'doctor-profile',
            component: DoctorProfile
        },
        {
            path: 'add-patient',
            name: 'add-patient',
            component: DoctorAddPatient
        },
        {
            path: 'patient-list',
            name: 'patient-list',
            component: DoctorPatientList
        },
        {
            path: 'patient-list/:id/records/:recordID',
            name: 'patient-records',
            component: DoctorPatientRecordView
        },  
        {
            path: 'patient-list/:id/records',
            name: 'patient-records',
            component: DoctorPatientRecords
        }, 
        {
            path: 'patient-list/:id/newrecord',
            name: 'patient-records',
            component: DoctorPatientRecordsNew
        },  
        {
            path: 'patient-list/:id/info',
            name: 'patient-info',
            component: DoctorPatientInfo
        },
    ]},
]