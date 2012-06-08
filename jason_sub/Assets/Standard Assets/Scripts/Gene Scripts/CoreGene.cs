using System;
using System.Collections.Generic;
using UnityEngine;


	public class CoreGene : IGene
	{
		public enum CoreChromosomeType{drivepowerMass,powerPackAllocation,
		motorAllocation,motorSpeedAllocation,motorTorqueAllocation,structureMass,
		powerPackCG,motorCG,structureMassCG};
	
		Dictionary<CoreChromosomeType,double> chromosomes;
		
    	List<IGene> children;
			
		public CoreGene ()
		{
			chromosomes = new Dictionary<CoreChromosomeType, double>();
			children = new List<IGene>();
			System.Random random = new System.Random();
			//generate random chromosome start values
			foreach(CoreChromosomeType type in Enum.GetValues(typeof(CoreChromosomeType)))
			{
				chromosomes.Add(type,random.NextDouble());
			}
			//add 2 wheels just to get started
		
		}
		
		public CoreGene (float childProbability)
		{
			
		}
		
		public Structure Express(Vector3 location,Structure parent)
		{
			Core creatureStructure = new Core();
			if(creatureStructure.GenerateFromGene(this,location,null))
			{
				return null;
			}
			foreach(IGene child in children)
			{
				child.Express(location, creatureStructure);
			}
			return creatureStructure;
		}
	
		public double getChromosome(CoreChromosomeType chromosome)
		{
			double retVal = 0;
			chromosomes.TryGetValue(chromosome,out retVal);
			return retVal;
		}
	}


