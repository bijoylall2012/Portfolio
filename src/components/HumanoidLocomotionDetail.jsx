const projectFigures = '/images/humanoid-locomotion/'

const dhRows = [
  ['1', 'θ₁', '−L₁', '0', 'π/2'],
  ['2', '−π/2 + θ₂', '0', 'L₂', 'π/2'],
  ['3', 'θ₃', '0', 'L₃', '0'],
  ['4', 'θ₄', '0', 'L₄', '0'],
  ['5', 'θ₅', '0', 'L₅', '−π/2'],
  ['6', 'θ₆', 'L₆', 'L₆', '0'],
]

const jointRanges = [
  ['Waist', 'Pitch', '−15 to 130', '−15 to 100'],
  ['Waist', 'Roll', '−30 to 45', '0 to 45'],
  ['Waist', 'Yaw', '−45 to 50', '−45 to 45'],
  ['Knee', 'Pitch', '−10 to 155', '0 to 120'],
  ['Ankle', 'Pitch', '−20 to 50', '−30 to 40'],
  ['Ankle', 'Roll', '−30 to 60', '−30 to 30'],
]

const matlabCode = `%Define the Denavit–Hartenberg parameters
dhparams = [0 pi/2 -0.1 0;
0.1 pi/2 0 -pi/2;
1 0 0 0;
1 0 0 0;
0.1 -pi/2 0 0;
0.2 0 0.2 0];
%Create the robot model
robot = rigidBodyTree;
%Add the base link
body1 = rigidBody('body1');
jnt1 = rigidBodyJoint('jnt1','revolute');
%Set the first joint transform
setFixedTransform(jnt1,dhparams(1,:),'dh');
body1.Joint = jnt1;
%Add the remaining links and joints
addBody(robot,body1,'base')
body2 = rigidBody('body2');
jnt2 = rigidBodyJoint('jnt2','revolute');
body3 = rigidBody('body3');
jnt3 = rigidBodyJoint('jnt3','revolute');
body4 = rigidBody('body4');
jnt4 = rigidBodyJoint('jnt4','revolute');
body5 = rigidBody('body5');
jnt5 = rigidBodyJoint('jnt5','revolute');
body6 = rigidBody('body6');
jnt6 = rigidBodyJoint('jnt6','revolute');
%Set the remaining joint transforms
setFixedTransform(jnt2,dhparams(2,:),'dh');
setFixedTransform(jnt3,dhparams(3,:),'dh');
setFixedTransform(jnt4,dhparams(4,:),'dh');
setFixedTransform(jnt5,dhparams(5,:),'dh');
setFixedTransform(jnt6,dhparams(6,:),'dh');
%Assign the joints to their links
body2.Joint = jnt2;
body3.Joint = jnt3;
body4.Joint = jnt4;
body5.Joint = jnt5;
body6.Joint = jnt6;
%Attach the links to the robot
addBody(robot,body2,'body1')
addBody(robot,body3,'body2')
addBody(robot,body4,'body3')
addBody(robot,body5,'body4')
addBody(robot,body6,'body5')
showdetails(robot)
%Display the robot and its reference frames
show(robot);
axis([-1,3,-2,0,-2,0])
%Generate a random joint configuration
randConfig=robot.randomConfiguration;
tform = getTransform(robot,randConfig,'body6','base');
show(robot,randConfig);
%Solve inverse kinematics for the generated pose
ik = inverseKinematics('RigidBodyTree',robot);
weights = [0.25 0.25 0.25 1 1 1];
initialguess = robot.homeConfiguration;
[configSoln,solnInfo] = ik('body6',tform,weights,initialguess);
show(robot,configSoln);`

const matlabTokens = /(%.*|'[^']*'|\b(?:rigidBodyTree|rigidBody|rigidBodyJoint|setFixedTransform|addBody|showdetails|show|axis|getTransform|inverseKinematics|randomConfiguration|homeConfiguration)\b|\b\d+(?:\.\d+)?\b)/g
const matlabCodeLines = matlabCode.split('\n')

function highlightedLine(line) {
  return line.split(matlabTokens).filter(Boolean).map((token, index) => {
    let className = ''
    if (token.startsWith('%')) className = 'humanoid-detail__code-comment'
    else if (token.startsWith("'")) className = 'humanoid-detail__code-string'
    else if (/^\d/.test(token)) className = 'humanoid-detail__code-number'
    else if (/^(rigidBodyTree|rigidBody|rigidBodyJoint|setFixedTransform|addBody|showdetails|show|axis|getTransform|inverseKinematics|randomConfiguration|homeConfiguration)$/.test(token)) className = 'humanoid-detail__code-function'
    return className ? <span className={className} key={index}>{token}</span> : token
  })
}

function MatlabCodePanel({ lines, part }) {
  return (
    <pre className="humanoid-detail__code"><code>{lines.map((line, index) => (
      <span className="humanoid-detail__code-line" key={`${part}-${index}`}>{highlightedLine(line)}{'\n'}</span>
    ))}</code></pre>
  )
}

function ProjectFigure({ src, alt, caption, loading = 'lazy', className = '' }) {
  const imageSrc = src.startsWith('/images/')
    ? `${import.meta.env.BASE_URL}${src.slice(1)}`
    : src.startsWith('/') ? src : `${projectFigures}${src}`
  return (
    <figure className={`humanoid-detail__figure${className ? ` ${className}` : ''}`}>
      <img src={imageSrc} alt={alt} loading={loading} decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function SectionHeading({ number, children }) {
  return (
    <header className="humanoid-detail__section-heading">
      <span aria-hidden="true">{number}</span>
      <h2>{children}</h2>
    </header>
  )
}

function DhTransformationMatrix() {
  return (
    <math className="humanoid-detail__math" display="block" aria-label="General Denavit–Hartenberg homogeneous transformation matrix">
      <mrow>
        <msubsup><mi>T</mi><mi>i</mi><mrow><mi>i</mi><mo>−</mo><mn>1</mn></mrow></msubsup>
        <mo>=</mo>
        <mo stretchy="true" fence="true">[</mo>
        <mtable columnalign="center center center center" rowspacing="0.35em" columnspacing="0.65em">
          <mtr>
            <mtd><mrow><mi mathvariant="normal">cos</mi><msub><mi>θ</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><mrow><mo>−</mo><mi mathvariant="normal">sin</mi><msub><mi>θ</mi><mi>i</mi></msub><mi mathvariant="normal">cos</mi><msub><mi>α</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><mrow><mi mathvariant="normal">sin</mi><msub><mi>θ</mi><mi>i</mi></msub><mi mathvariant="normal">sin</mi><msub><mi>α</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><mrow><msub><mi>a</mi><mi>i</mi></msub><mi mathvariant="normal">cos</mi><msub><mi>θ</mi><mi>i</mi></msub></mrow></mtd>
          </mtr>
          <mtr>
            <mtd><mrow><mi mathvariant="normal">sin</mi><msub><mi>θ</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><mrow><mi mathvariant="normal">cos</mi><msub><mi>θ</mi><mi>i</mi></msub><mi mathvariant="normal">cos</mi><msub><mi>α</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><mrow><mo>−</mo><mi mathvariant="normal">cos</mi><msub><mi>θ</mi><mi>i</mi></msub><mi mathvariant="normal">sin</mi><msub><mi>α</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><mrow><msub><mi>a</mi><mi>i</mi></msub><mi mathvariant="normal">sin</mi><msub><mi>θ</mi><mi>i</mi></msub></mrow></mtd>
          </mtr>
          <mtr>
            <mtd><mn>0</mn></mtd>
            <mtd><mrow><mi mathvariant="normal">sin</mi><msub><mi>α</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><mrow><mi mathvariant="normal">cos</mi><msub><mi>α</mi><mi>i</mi></msub></mrow></mtd>
            <mtd><msub><mi>d</mi><mi>i</mi></msub></mtd>
          </mtr>
          <mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>
        </mtable>
        <mo stretchy="true" fence="true">]</mo>
      </mrow>
    </math>
  )
}

function OverallTransformationEquation() {
  return (
    <math className="humanoid-detail__math humanoid-detail__math--overall" display="block" aria-label="T six superscript zero equals T one superscript zero times T two superscript one times T three superscript two times T four superscript three times T five superscript four times T six superscript five">
      <mrow>
        <msubsup><mi>T</mi><mn>6</mn><mn>0</mn></msubsup><mo>=</mo>
        <msubsup><mi>T</mi><mn>1</mn><mn>0</mn></msubsup><mo>·</mo>
        <msubsup><mi>T</mi><mn>2</mn><mn>1</mn></msubsup><mo>·</mo>
        <msubsup><mi>T</mi><mn>3</mn><mn>2</mn></msubsup><mo>·</mo>
        <msubsup><mi>T</mi><mn>4</mn><mn>3</mn></msubsup><mo>·</mo>
        <msubsup><mi>T</mi><mn>5</mn><mn>4</mn></msubsup><mo>·</mo>
        <msubsup><mi>T</mi><mn>6</mn><mn>5</mn></msubsup>
      </mrow>
    </math>
  )
}

function HumanoidLocomotionDetail() {
  return (
    <div className="humanoid-detail" aria-label="Kinematics project details">
      <section className="humanoid-detail__section" aria-labelledby="humanoid-introduction">
        <SectionHeading number="01"><span id="humanoid-introduction">Introduction</span></SectionHeading>
        <p className="humanoid-detail__lead">Bipedal walking depends on coordinated motion across the hip, knee, and ankle. This project models one humanoid leg as a six-degree-of-freedom mechanism, with the foot as its end effector. Forward and inverse kinematics relate the joint configuration to the foot’s pose, while a constrained multibody simulation examines the mechanism’s motion.</p>

        <div className="humanoid-detail__figure-grid humanoid-detail__figure-grid--lead">
          <ProjectFigure
            src="figure-02-fusion-360-cad.png"
            alt="Fusion 360 CAD model showing linked humanoid legs, revolute joints, and feet on a grid."
            caption="Model using Fusion 360"
            loading="eager"
            className="humanoid-detail__fusion-figure"
          />
          <figure className="humanoid-detail__figure humanoid-detail__axes-figure">
            <div className="humanoid-detail__axes-frame">
              <img src="/images/Axes.png" alt="Schematic of one humanoid leg showing the hip, knee, ankle, and foot end effector." loading="eager" decoding="async" />
            </div>
            <figcaption>Link and Joint Model</figcaption>
          </figure>
        </div>

        <div className="humanoid-detail__subsection humanoid-detail__joint-ranges">
          <h3>Revolute Joints: Range of Motion</h3>
          <div className="humanoid-detail__table-wrap">
            <table>
              <thead>
                <tr><th scope="col">Joint</th><th scope="col">Motion</th><th scope="col">Standard Human Leg (Degrees)</th><th scope="col">Humanoid Robot (Degrees)</th></tr>
              </thead>
              <tbody>
                {jointRanges.map(([joint, motion, human, robot]) => (
                  <tr key={`${joint}-${motion}`}><th scope="row">{joint}</th><td>{motion}</td><td>{human}</td><td>{robot}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="humanoid-detail__table-caption">Ranges of various joints (Degrees)</p>
          <p className="humanoid-detail__note">(Some joint ranges differ from human-leg ranges because of interference between mechanical parts.)</p>
        </div>
      </section>

      <section className="humanoid-detail__section" aria-labelledby="humanoid-kinematics">
        <SectionHeading number="02"><span id="humanoid-kinematics">Forward Kinematics</span></SectionHeading>
        <p>The leg is represented by six links, with three rotational degrees of freedom at the hip, one at the knee, and two at the ankle. Coordinate frames are assigned using the Denavit–Hartenberg convention; the resulting parameters define the homogeneous transformation for each link.</p>
        <p>Forward kinematics maps the joint variables to the position and orientation of the foot. MATLAB was used to simplify the resulting transformation expressions.</p>
        <div className="humanoid-detail__figure-grid humanoid-detail__kinematic-figures">
          <figure className="humanoid-detail__figure humanoid-detail__kinematic-figure">
            <div className="humanoid-detail__kinematic-visual humanoid-detail__coordinate-visual">
              <img src="/images/frames.png" alt="Coordinate-frame assignment for the six-link humanoid leg mechanism." loading="lazy" decoding="async" />
            </div>
            <figcaption>Coordinate-frame assignment for the six-link humanoid leg mechanism</figcaption>
          </figure>
          <figure className="humanoid-detail__figure humanoid-detail__kinematic-figure">
            <div className="humanoid-detail__kinematic-visual humanoid-detail__matrix-visual">
              <DhTransformationMatrix />
            </div>
            <figcaption>General homogeneous transformation matrix using the Denavit–Hartenberg convention</figcaption>
          </figure>
        </div>

        <figure className="humanoid-detail__dh-figure">
          <div className="humanoid-detail__table-wrap humanoid-detail__dh-table-wrap">
            <table className="humanoid-detail__dh-table" aria-describedby="humanoid-dh-caption">
              <thead><tr><th scope="col">Link i</th><th scope="col">θᵢ</th><th scope="col">dᵢ</th><th scope="col">aᵢ</th><th scope="col">αᵢ</th></tr></thead>
              <tbody>{dhRows.map((row) => <tr key={row[0]}>{row.map((value, index) => index === 0 ? <th scope="row" key={index}>{value}</th> : <td key={index}>{value}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <figcaption className="humanoid-detail__table-caption" id="humanoid-dh-caption">Simplified Denavit–Hartenberg parameters for the humanoid leg mechanism</figcaption>
        </figure>

        <div className="humanoid-detail__subsection humanoid-detail__overall-transform">
          <h3>Overall transformation matrix</h3>
          <p>For each link, the Denavit–Hartenberg parameters define a homogeneous transformation matrix that describes the position and orientation of its coordinate frame relative to the preceding frame. The overall transformation is obtained by multiplying the individual transformations in sequence:</p>
          <p className="humanoid-detail__overall-equation" aria-label="Overall transformation matrix from frame zero to frame six">
            <OverallTransformationEquation />
          </p>
          <p>The resulting matrix describes the position and orientation of the foot coordinate frame relative to the base coordinate frame.</p>
        </div>
      </section>

      <section className="humanoid-detail__section" aria-labelledby="humanoid-inverse-kinematics">
        <SectionHeading number="03"><span id="humanoid-inverse-kinematics">Inverse Kinematics</span></SectionHeading>
        <p>Inverse kinematics was formulated in MATLAB with the Robotics Toolbox. A six-link rigid-body tree represents the mechanism, and the solver finds joint configurations for specified end-effector poses. The code and illustrations below show solutions for the home position and a random configuration.</p>
        <div className="humanoid-detail__inverse-code">
          <div className="humanoid-detail__inverse-code-grid" role="group" aria-label="MATLAB inverse-kinematics code, continued across two panels">
            <MatlabCodePanel lines={matlabCodeLines.slice(0, 29)} part="1" />
            <MatlabCodePanel lines={matlabCodeLines.slice(29)} part="2" />
          </div>
        </div>
        <div className="humanoid-detail__inverse-visuals">
          <ProjectFigure
            src="figure-05-home-position.png"
            alt="Six-link robot in its home-position solution."
            caption="Home Position Solution"
            className="humanoid-detail__inverse-primary"
          />
          <div className="humanoid-detail__inverse-visual-stack">
            <ProjectFigure src="figure-06-random-configuration.png" alt="Six-link robot in a random configuration, shown in a three-dimensional coordinate plot." caption="Random Configuration Solution" />
            <ProjectFigure src="figure-07-random-configuration-alternate.png" alt="Six-link robot in another random configuration, shown in a three-dimensional coordinate plot." caption="Random Configuration Solution" />
          </div>
        </div>
      </section>

      <section className="humanoid-detail__section" aria-labelledby="humanoid-multibody-simulation">
        <SectionHeading number="04"><span id="humanoid-multibody-simulation">Multibody Simulation</span></SectionHeading>
        <div className="humanoid-detail__subsection">
          <h3>Model Development in MSC ADAMS</h3>
          <p>The six-degree-of-freedom leg was recreated in MSC ADAMS, a multibody dynamics simulation tool, to examine its motion under joint constraints. Six links are connected by revolute joints, with the foot as the end effector, following the configuration established in the kinematic model.</p>
          <p>Link lengths are 5 cm for link 1, 10 cm for link 2, 25 cm for link 3, 30 cm for link 4, and 2.5 cm each for links 5 and 6. The foot is modeled as a rigid body attached to the ankle assembly.</p>
          <p>The six rotations are distributed across three joint assemblies. At the hip, three revolute joints connect the ground to link 1, link 1 to link 2, and link 2 to link 3. A single revolute joint connects links 3 and 4 at the knee. At the ankle, two revolute joints connect links 4 and 5, then links 5 and 6. This arrangement preserves the kinematic model’s joint structure and allows each joint’s effect on foot motion to be examined.</p>
        </div>
        <div className="humanoid-detail__multibody-poses">
          <figure className="humanoid-detail__figure humanoid-detail__multibody-pose">
            <div className="humanoid-detail__pose-crop humanoid-detail__pose-crop--left">
              <img src={`${projectFigures}figure-10-adams-motion-poses.png`} alt="First MSC ADAMS configuration of the robotic leg during the constrained walking motion." loading="lazy" decoding="async" />
            </div>
            <figcaption>Side View</figcaption>
          </figure>
          <figure className="humanoid-detail__figure humanoid-detail__multibody-pose">
            <div className="humanoid-detail__pose-crop humanoid-detail__pose-crop--right">
              <img src={`${projectFigures}figure-10-adams-motion-poses.png`} alt="Second MSC ADAMS configuration of the robotic leg during the constrained walking motion." loading="lazy" decoding="async" />
            </div>
            <figcaption>Isometric View</figcaption>
          </figure>
        </div>
        <div className="humanoid-detail__subsection">
          <h3>Simulation Under Joint Constraints</h3>
          <p>The mechanism was simulated in MSC ADAMS under predefined motion constraints. The case examined a constrained forward-walking motion, with selected joint rotations fixed or limited to represent a simplified walking configuration.</p>
          <p>Hip roll and yaw, along with ankle roll, were locked. Knee motion was limited to 0°–45°, and ankle pitch to 0°–15°. Waist pitch was also constrained to 0°–45°.</p>
          <p>These constraints enabled the mechanism’s motion to be examined over time. MSC ADAMS provided time-dependent joint and foot outputs for investigating translational and angular motion throughout the simulation.</p>
          <p>The foot, as the end effector, was tracked at its centre of mass. Its displacement trajectory shows the workspace reached under the selected constraints. Joint-motion and foot outputs are presented in the next section.</p>
        </div>
      </section>

      <section className="humanoid-detail__section" aria-labelledby="humanoid-results-analysis">
        <SectionHeading number="05"><span id="humanoid-results-analysis">Results and Analysis</span></SectionHeading>

        <div className="humanoid-detail__subsection humanoid-detail__results-content">
          <div className="humanoid-detail__results-grid">
            <ProjectFigure src="/images/Figure-12.png" alt="Hip joint JOINT_3 time-history plot showing translational velocity and displacement magnitude, angular velocity magnitude, and angular acceleration magnitude over time." caption="Hip Kinematics vs Time" loading="eager" />
          </div>

          <div className="humanoid-detail__results-grid">
            <ProjectFigure src="/images/Figure-13.png" alt="Knee marker MARKER_21 time-history plot showing translational acceleration, velocity, and displacement magnitudes over time." caption="Knee Kinematics vs Time" loading="eager" />
          </div>

          <div className="humanoid-detail__results-grid">
            <ProjectFigure src="/images/Figure-14.png" alt="Foot end-effector PART_8.CM time-history plot showing position, velocity, and acceleration magnitudes over time." caption="Foot (End-Effector) Kinematics vs Time" loading="eager" />
          </div>

          <ul className="humanoid-detail__workflow humanoid-detail__results-insights">
            <li><strong>Joint motion is not uniform over time.</strong> The variations in joint velocity and acceleration indicate that the leg undergoes different motion phases during the simulation. Identifying the intervals with the largest changes would help locate demanding portions of the motion for further joint-level analysis.</li>
            <li><strong>Foot motion reflects the combined effect of the leg joints.</strong> The foot’s position, velocity, and acceleration vary throughout the simulation, illustrating how individual joint movements translate into end-effector motion. Comparing these outputs with the joint curves can help identify which phases of joint motion correspond to major changes in foot movement.</li>
            <li><strong>Foot trajectory provides a basis for evaluating reachable workspace.</strong> Tracking the foot’s position over time establishes its movement path under the imposed joint constraints. Comparing this path with a target walking trajectory would be a useful next step to assess foot clearance, stride consistency, and the suitability of the simulated motion for bipedal locomotion.</li>
          </ul>

          <h3 className="humanoid-detail__results-summary-heading">Overall Interpretation</h3>
          <p>The hip and knee plots show how joint motion varies over time under the prescribed constraints. The hip has three rotational degrees of freedom, while the knee has one. Hip roll and yaw and ankle roll are locked; knee motion is limited to 0–45°, and ankle pitch to 0–15°. These constraints define the motion available to the leg during the simulated forward-walking case.</p>
          <p>The foot, which serves as the end effector, reflects the combined motion of the hip, knee, and ankle. Its position, velocity, and acceleration plots show how the leg's joint movements translate into foot motion. Tracking the foot's trajectory also helps examine the workspace reachable under the selected constraints.</p>
          <p>Together, the MATLAB kinematic formulation and MSC ADAMS simulation connect the mechanism's mathematical relationships with its time-dependent motion. Further analysis would be needed to compare the trajectory with reference gait data and assess its biomechanical realism.</p>
        </div>
      </section>

      <section className="humanoid-detail__section" aria-labelledby="humanoid-outcome">
        <SectionHeading number="06"><span id="humanoid-outcome">Outcome</span></SectionHeading>
        <p className="humanoid-detail__outcome">The project brought together forward and inverse kinematics, Jacobian-based velocity analysis, and multibody simulation in a single robotic-leg model. It established a framework for investigating how joint configurations influence foot motion and how different joint constraints could be studied in subsequent simulations.</p>
      </section>
    </div>
  )
}

export default HumanoidLocomotionDetail
