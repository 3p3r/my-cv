# Sepehr Laal's CV

- Email: [human@shadowofsep.com](mailto:human@shadowofsep.com)
- Location: Portland, OR
- Website: [shadowofsep.com](https://shadowofsep.com/)


# Education
## **Portland State University**, MSc. in Signal Processing -- Portland, OR

**MSc.**


2017 – May 2023

- Thesis: [BodySLAM](https://pdxscholar.library.pdx.edu/open_access_etds/6412/) — SLAM for tracking human kinematics; advisor James McNames

- First-author article in Sensors (Dec 2022) based on thesis research



## **Portland State University**, BSc. in Electrical Engineering -- Portland, OR

**BSc.**


2013 – 2017



# Publications
## **BodySLAM: Feasibility of Tracking Human Kinematics with Simultaneous Localization and Mapping (SLAM)**

Apr 2023

Thesis version of Sensors (2022) article; advisor James McNames

*Sepehr Laal*

[10.15760/etd.3557](https://doi.org/10.15760/etd.3557) (M.S. Thesis, Portland State University, ECE)



## **Feasibility of Tracking Human Kinematics with Simultaneous Localization and Mapping**

Dec 2022

Journal article from thesis research (Special Issue on Smart and Personalized Healthcare); first author; PSU ECE

*Sepehr Laal*, Paul Vasilyev, Sean Pearson, Mateo Aboy, James McNames

[10.3390/s22239378](https://doi.org/10.3390/s22239378) (Sensors 2022, 22(23), 9378)



## **Validation of Media Using Fingerprinting**

Sept 2021

Granted patent for media validation using Wavelet Decomp fingerprinting; sole inventor; AWS Elemental

*Sepehr Laal*

[patents.google.com/patent/US11134279B1/en](https://patents.google.com/patent/US11134279B1/en) (US 11,134,279 B1, Amazon Technologies Inc)



# Certifications
- AWS Certified DevOps Engineer Professional (2019) — Verification RNXRXBF1F2QE1C59

- AWS Certified Developer Associate (2019) — Verification 02514XVKMJBQQ2WS

# Experience
## **Citi Bank**, Senior VP of AI/ML Engineering and RL Infrastructure -- Portland, OR / remote

2025 – present

- Deployed and managed a multi-tenant n8n infrastructure on OpenShift

- Designed and implemented a scalable topology of LiteLLM deployments to standardize model access across orgs

- Architected and implemented a multi-tenant RL infrastructure to facilitate workflows of AI/ML engineers

- Architected and Deployed OpenCode, OpenChamber, Web Fetch and Markdown conversion services for internal use, enabling 10000+ engineers to use them in their workflows

- Automated and deployed Cloakbrowser for agentic web browsing and data extraction internally

- Integrated DeepEval into n8n and LiteLLM for transparent evals and fine tuning of AI/ML models

- Deployed Prompt Caching services to reduce costs and improve performance of inference across orgs



## **Citi Bank**, Senior VP of Cloud Security and Infrastructure -- Portland, OR / remote

2020 – 2025

- Designed, implemented and maintained a transparent Guardrail service for bank's AWS account inventory

- 4+ years of maintaining and operating a development kit for cloud engineers to create and deploy new guardrails

- Designed, architected, and implemented a sub milisecond LALR parser engine that reduced cost of processing billions of AWS Event Rules on all AWS accounts by a factor of $1M per month, using Tree Sitter and Rust



## **Stelligent Systems LLC**, DevOps Automation Engineer II -- Portland, OR

2019 – 2020

- Architected an AWS solution for Schneider Electric involving AWS Direct Connect, legacy system APIs, incident response, telemetry, and AWS Cognito bridged with enterprise authentication in a 100% Lambda serverless environment

- Led development of [Stelligent Mutato](https://github.com/stelligent/mutato), a serverless framework for deploying containerized applications into any AWS account in a Heroku-like workflow; patterns later appeared in the official AWS CDK pipelines module

- Prepared technical documents and hosted a webinar for an internal hackathon at First Republic Bank in San Francisco



## **RootStream**, Co-Founder and CTO -- Portland, OR

2018 – 2019

- Helped DotDotDash deploy RootStream on premises, replicating the AWS environment on-site for p2p video streaming during Covid-19

- Architected and implemented a serverless WebRTC video ingestion platform

- Optimized the build pipeline using Docker, reducing overhead from hours to minutes

- Incorporated SQS and API Gateway WebSockets to scale platform microservices

- Automated generic-kernel Ubuntu AMI creation using Packer and CodeBuild

- Decoupled video ingestion from consumption with Kinesis Video Streams

- Used Amazon FSx for Lustre to back up machine learning output data into S3 buckets

- Used Drone CI to automate building Docker images up to 15GB in size



## **Virtulabs / Independent**, Software Consulting and Contracting -- Portland, OR

2017 – 2019

- Used Vuforia and Vuforia Cloud to create augmented reality experiences

- Used HoloLens and Unity3D to create medical-related mixed AR experiences

- Leveraged Unity Cloud Build to automate Unity build pipelines

- Used ARCore Cloud Anchors to create shared AR experiences on Android

- Used Expo and React Native to make an app that rewards users for walking

- Used CircleCI, DroneCI, GitHub, CodePipeline, and Heroku across multiple projects

- Used s3-fuse in production to back up artifacts and outputs into S3

- Used Elastic Beanstalk, ECS, API Gateway, and Lambda across multiple projects



## **AWS Elemental Technologies**, Software Development Engineer -- Portland, OR

2017 – 2018

- Led a research project creating an automated golden-ear testing system, granted [US 11,134,279 B1](https://patents.google.com/patent/US11134279B1/en) for media fingerprinting validation

- Implemented Waveprint efficient wavelet-based audio fingerprinting in CudaC++

- Used automated golden-ear testing to reveal undiscovered bugs in the audio transcoder

- Implemented new features and fixed bugs in the Elemental Live product



## **Helio Interactive PDX**, Software Engineer -- Portland, OR

2015 – 2017

- Built an ASP.NET MVC CMS with multi-zone replicated SQL Server and offline support

- Used RabbitMQ and MQTT to create realtime IoT applications with limited connectivity

- Used GStreamer to create multi-computer synchronized video playback for video walls

- Used Unity3D to make custom software and solutions for entertainment events

- Developed shaders using GLSL, HLSL, and NVIDIA Cg for a realtime renderer



## **Downstream PDX**, Software Engineer -- Portland, OR

2014 – 2015

- Worked on a multi-computer renderer able to render massive pixel spaces across PCs

- Worked on the protocol used by the multi-computer renderer to render synced video

- Used C++, Cinder, and OpenFrameworks to create custom entertainment software

- Used FFmpeg, VLC, and GStreamer to add multimedia capabilities to the renderer

- Developed low-level graphical applications with OpenGL and C++11



# Open Source Projects
## **[Sparse Dynamics](https://sparsedynamix.com/)**

2026

Antivirus tooling for AI harnesses — [Guardian](https://github.com/Sparse-Dynamix/guardian) CLI scans agent skills before execution; [Trypanophobe](https://github.com/Sparse-Dynamix/trypanophobe) reference backend for policy and enforcement; Paladin (kernel-level harness safety) in development



## **[pleadable-cowork](https://github.com/virtulabs/pleadable-cowork)**

2026

Web-based AI agent interface with a Claude Cowork-style UI (React, LangChain, Tailwind); multi-threaded conversations with filesystem support; live at [app.pleadable.chat](https://app.pleadable.chat)



## **[webzme](https://github.com/zorse-code/webzme)**

2023

VS Code extension — Zorse CloudFusion visual editor for AWS CloudFormation, Azure ARM, GCP Deployment Manager, and Alibaba ROS infrastructure templates



## **[tree-sitter-eventrule](https://github.com/3p3r/tree-sitter-eventrule)**

2023

Tree-sitter grammar for AWS EventBridge event patterns; ships `rule2rego`, a compiler that transpiles Event Rules to OPA Rego policies



## **[wasabio](https://github.com/3p3r/wasabio)**

2024

WASM + SharedArrayBuffer runtime for multi-threaded browser apps; spec-compatible shims for Node fs, localStorage, and EventEmitter (Rust, C, TypeScript)



## **[fakettp](https://github.com/3p3r/fakettp)**

2023

Drop-in Node `http` module replacement implemented in a service worker; runs Express and socket.io in the browser without a network adapter



## **[pf-localization](https://github.com/3p3r/pf-localization)**

2017

CUDA particle-filter library for real-time camera pose estimation on checkerboard scenes without PnP; MATLAB orchestration, adapted from JEI 2014 camera-tracking research



# Skills
**Primary Languages:** ANSI C / C++, JavaScript

**Other Languages:** TypeScript, Python, PHP, GLSL, HLSL, Cg, C#

**Tooling & Libraries:** Unity3D, UE4, ASP.NET, React, React Native, Expo SDK, CUDA, MQTT, RabbitMQ, WebSockets, OpenGL, Terraform, GStreamer, FFmpeg, DroneCI, CircleCI, Jenkins, Git, GitHub

**Containers:** Docker, ECS, ECR

**Databases:** MongoDB, DocumentDB, MySQL, MSSQL, SQLite

**Operating Systems:** Ubuntu, Amazon Linux, CentOS, Windows

**AWS Infrastructure:** CloudFormation, AWS CDK

**AWS Compute & Storage:** EC2, Lightsail, ECS, Lambda, Elastic Beanstalk, S3, EBS

**AWS Database & Networking:** RDS, DynamoDB, DocumentDB, CloudFront, Route 53, API Gateway

**AWS DevOps & Management:** CodeCommit, CodeBuild, CodePipeline, CodeDeploy, CloudWatch, CloudTrail, X-Ray, Auto Scaling

**AWS Media & ML:** Elastic Transcoder, Kinesis Video, Elemental/Media services, Transcribe, Translate
