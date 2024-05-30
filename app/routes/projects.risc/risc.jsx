import riscBackground from '~/assets/projects/risc/background-.jpeg';
import riscBackgroundLarge from '~/assets/projects/risc/background-.jpeg';
import FPGA from '~/assets/projects/risc/FPGA.png';
import lab5Image from '~/assets/projects/risc/lab5.jpg';
// import lab6Image from '~/assets/projects/risc/lab6.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './risc.module.css';

const title = 'Simple RISC machine';
const description =
  'Using VHDL and an FPGA to design and test a simple RISC (Reduced Instruction Set Computer) machine from scratch.';
const roles = [
  'Hardware Design',
  'VHDL Programming',
  'FPGA Implementation',
  'Testbench Development',
  // 'ModelSim Simulation',
  // 'Quartus Synthesis',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Risc = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={riscBackground}
          srcSet={`${riscBackground} 1280w, ${riscBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          //   placeholder={riscBackgroundPlaceholder}
          opacity={0.5}
        />
        <ProjectHeader title={title} description={description} roles={roles} />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${FPGA} 800w, ${FPGA} 1920w`}
              width={800}
              height={500}
              // placeholder={sliceAppPlaceholder}
              alt="Sketch of FPGA Board"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Overview</ProjectSectionHeading>
            <ProjectSectionText>
              In this project, I designed and implemented a simple RISC machine in a
              16-bit architecture using Systems Verilog as my hardware description
              language. I used ModelSim to write testbenches and simulate the design, and
              Quartus to synthesize my design onto an FPGA board. The design includes
              everything you would find in a normal computer, such as an ALU, registers,
              memory, control units, and I/O functionality. The RISC machine has a
              noticable resemblance to the ARM ISA, but with a much simpler instruction
              set.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${lab5Image} 440w, ${lab5Image} 880w`}
                  width={440}
                  height={340}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Step 1 – Datapath</ProjectSectionHeading>
              <ProjectSectionText>
                First I started by designing the datapath. The datapath consists of
                smaller modules such as the ALU, registers, multiplexers, a shifter unit
                and a register file.
              </ProjectSectionText>
              <ProjectSectionText>
                Throughout this process, I made sure to conform to Verilog standards that
                allowed for my design to be synthesizable. This way I could incrementally
                test my design on the FPGA board using Quartus.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                Real-time collaborative annotation facilitated better collaboration
                between learners, and was much easier to run group exercises with the new
                shared layers feature. Learners gave feedback that is was enjoyable to
                work together and see what others were doing, and liked how interactive
                and easy to use the application was.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={lab5Image}
              width={940}
              height={500}
              placeholder={lab5Image}
              alt="Students at the University of New South Wales using the new collaborative annotation features"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${lab5Image} 440w, ${lab5Image} 880w`}
                  width={440}
                  height={340}
                  placeholder={lab5Image}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Step 2 – FSM Controller</ProjectSectionHeading>
              <ProjectSectionText>
                Now, we have created the datapath which can perform various arithmetic and
                bitwise operations, however, we need a way to automate the process of
                setting control inputs to the datapth; this is where the FSM controller
                comes in. After defining 16 bit instructions, an instruction register
                feeds instructions to the controller, and the controller enables certain
                registers as is necessary.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${lab5Image} 440w, ${lab5Image} 880w`}
                  width={440}
                  height={340}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Step 3 – Memory and I/O</ProjectSectionHeading>
              <ProjectSectionText>
                Now, we add functionality for memory based instructions, simply load and
                store operations.
              </ProjectSectionText>
              <ProjectSectionText>
                Throughout this process, I made sure to conform to Verilog standards that
                allowed for my design to be synthesizable. This way I could incrementally
                test my design on the FPGA board using Quartus.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>I/O and FPGA</ProjectSectionHeading>
              <ProjectSectionText>Testing was done on the FPGA.</ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={lab5Image}
              width={940}
              height={500}
              placeholder={lab5Image}
              alt="Students at the University of New South Wales using the new collaborative annotation features"
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
